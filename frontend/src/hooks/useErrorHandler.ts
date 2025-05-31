import { useTranslations } from 'next-intl'
import { useSnackbar } from 'notistack'
import { AppError } from '@/utils/error'
import { AppErrorCode } from '@/types/enums'

export function useErrorHandler() {
  const t = useTranslations('Errors')
  const { enqueueSnackbar } = useSnackbar()

  const createError = (code: AppErrorCode): AppError => {
    return new AppError(code, t(`${code}.title`), t(`${code}.message`))
  }

  const handleError = (error: unknown) => {
    const appError = AppError.fromError(error as Error)
    enqueueSnackbar(appError.message, { variant: 'error' })
  }

  return {
    createError,
    handleError
  }
}
