import { useSnackbar } from 'notistack'
import { useTranslations } from 'next-intl'

export enum NotificationVariant {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export function useNotification() {
  const { enqueueSnackbar } = useSnackbar()
  const t = useTranslations('Notifications')

  const showNotification = (
    key: string,
    variant: NotificationVariant = NotificationVariant.INFO
  ) => {
    enqueueSnackbar(t(key), {
      variant
    })
  }

  return {
    showNotification
  }
}
