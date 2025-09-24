import {
  Button,
  Group,
  type MantineColor,
  Mark,
  Stack,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export function useModals() {
  const t = useTranslations();

  return {
    confirmDelete: ({
      color = 'red',
      onConfirm,
    }: {
      color?: MantineColor;
      onConfirm: () => void;
    }) => {
      const modalId = 'confirm';

      modals.open({
        modalId,
        centered: true,
        withCloseButton: false,

        overlayProps: {
          blur: 5,
          opacity: 1,
        },

        children: (
          <Stack>
            <div>
              <Text span>{t('confirmDelete.areYouSureAboutThisAction')} </Text>
              <Mark>{t('confirmDelete.actionCannotBeUndone')}</Mark>
            </div>

            <Group grow>
              <Button
                variant="default"
                leftSection={<IconX size={20} />}
                onClick={() => modals.close(modalId)}
              >
                {t('confirmDelete.cancel')}
              </Button>

              <Button
                color={color}
                leftSection={<IconTrash size={20} />}
                onClick={() => {
                  onConfirm();
                  modals.close(modalId);
                }}
              >
                {t('confirmDelete.confirm')}
              </Button>
            </Group>
          </Stack>
        ),
      });
    },
  };
}
