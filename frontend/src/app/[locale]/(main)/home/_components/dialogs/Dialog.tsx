'use client'

import Box from '@mui/material/Box'
import MuiDialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/buttons/Button'
import { createFieldValidator } from '@/utils/validation'
import { BRDGE_GAS_FEE_AMOUT_XRP } from '@/constants/app'
import { useNotification, NotificationVariant } from '@/hooks/useNotification'
import { useSupplyForm } from '@/forms/useSupplyForm'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  token: any
  address: string
}

export default function Dialog({
  open,
  onClose,
  title,
  token,
  address
}: DialogProps) {
  const { showNotification } = useNotification()
  const t = useTranslations('Market.dialog')

  const handleSuccess = () => {
    showNotification('supplySuccess', NotificationVariant.SUCCESS)
    onClose()
  }

  const handleError = () => {
    showNotification('supplyFailed', NotificationVariant.ERROR)
  }

  const { form, schema, isLoading } = useSupplyForm(
    address,
    handleSuccess,
    handleError
  )

  return (
    <MuiDialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          component="form"
          onSubmit={async (e) => {
            e.preventDefault()
            try {
              await form.handleSubmit()
            } catch (error) {
              handleError()
            }
          }}
        >
          <Box sx={{ pt: 1 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 1, textAlign: 'right' }}
            >
              {t('walletBalance')}: {token?.balance || 0} {token?.symbol || ''}
            </Typography>
            <form.Field
              name="amount"
              validators={{
                onChange: createFieldValidator('amount', schema)
              }}
            >
              {(field) => (
                <FormControl
                  error={field.state.meta.errors.length > 0}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <InputLabel htmlFor="bridge-amount-input">
                    {t('amount')}
                  </InputLabel>
                  <OutlinedInput
                    label={t('amount')}
                    id="bridge-amount-input"
                    type="text"
                    autoFocus={false}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <img
                          src={`/icons/${token?.symbol || ''}.png`}
                          alt={token?.symbol || ''}
                          width={24}
                          height={24}
                        />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography variant="body2" color="text.secondary">
                          {token?.symbol || ''}
                        </Typography>
                      </InputAdornment>
                    }
                    aria-describedby="bridge-amount-input-helper-text"
                    inputProps={{
                      'aria-label': 'bridge-amount-input'
                    }}
                  />
                  <FormHelperText>
                    {field.state.meta.errors.length > 0 ? t('error') : ''}
                  </FormHelperText>
                </FormControl>
              )}
            </form.Field>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('transactionOverview')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 2
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">{t('supplyApy')}</Typography>
                <Typography variant="body1">5%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">
                  {t('collateralization')}
                </Typography>
                <Typography variant="body1">Yes</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">{t('healthFactor')}</Typography>
                <Typography variant="body1">1.5</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">{t('bridgeFee')}</Typography>
                <Typography variant="body1">
                  {BRDGE_GAS_FEE_AMOUT_XRP} XRP
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={form.state.values.amount === '' || isLoading}
            >
              {isLoading
                ? t('processing')
                : `${t('supply')} ${token?.symbol || ''}`}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </MuiDialog>
  )
}
