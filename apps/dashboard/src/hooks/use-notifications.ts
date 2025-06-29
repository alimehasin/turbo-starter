import { showNotification } from '@mantine/notifications';
import { useTranslations } from 'next-intl';

export function useNotifications() {
  const t = useTranslations();

  return {
    success: (message: string) => {
      showNotification({
        color: 'green',
        title: t('common.success'),
        message,
      });
    },

    info: (message: string) => {
      showNotification({
        color: 'blue',
        title: t('common.done'),
        message,
      });
    },

    error: (message: string) => {
      showNotification({
        color: 'red',
        title: t('common.error'),
        message,
      });
    },
  };
}
