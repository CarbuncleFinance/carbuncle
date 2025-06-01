'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { Button, Menu, MenuItem, Typography } from '@mui/material'
import { Languages, LanguageNames, type Language } from '@/types/enums'

export default function LangSwitchButton() {
  const t = useTranslations('Menus.languageMenu')
  const router = useRouter()
  const pathname = usePathname()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currentLocale, setCurrentLocale] = useState<string>(Languages.EN)
  const open = Boolean(anchorEl)

  useEffect(() => {
    const storedLocale = localStorage.getItem('NEXT_LOCALE')
    if (
      storedLocale &&
      Object.values(Languages).includes(storedLocale as Language)
    ) {
      setCurrentLocale(storedLocale)
    } else {
      const pathLocale = window.location.pathname.split('/')[1]
      if (Object.values(Languages).includes(pathLocale as Language)) {
        setCurrentLocale(pathLocale)
      }
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (locale: string) => {
    localStorage.setItem('NEXT_LOCALE', locale)
    setCurrentLocale(locale)
    router.push(pathname, { locale })
    handleClose()
  }

  const getCurrentLanguageFlag = () => {
    switch (currentLocale) {
      case Languages.JA:
        return '🇯🇵'
      case Languages.KO:
        return '🇰🇷'
      default:
        return '🇺🇸'
    }
  }

  const getCurrentLanguageName = () => {
    return (
      LanguageNames[currentLocale as Language] || LanguageNames[Languages.EN]
    )
  }

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        sx={{ minWidth: 'auto' }}
      >
        {getCurrentLanguageFlag()} {getCurrentLanguageName()}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#1a1a1a'
          }
        }}
      >
        <MenuItem dense onClick={() => handleLanguageChange(Languages.EN)}>
          <Typography
            variant="inherit"
            sx={{ color: '#fff', cursor: 'pointer' }}
          >
            🇺🇸 {t('english')}
          </Typography>
        </MenuItem>
        <MenuItem dense onClick={() => handleLanguageChange(Languages.JA)}>
          <Typography
            variant="inherit"
            sx={{ color: '#fff', cursor: 'pointer' }}
          >
            🇯🇵 {t('japanese')}
          </Typography>
        </MenuItem>
        <MenuItem dense onClick={() => handleLanguageChange(Languages.KO)}>
          <Typography
            variant="inherit"
            sx={{ color: '#fff', cursor: 'pointer' }}
          >
            🇰🇷 {t('korean')}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
