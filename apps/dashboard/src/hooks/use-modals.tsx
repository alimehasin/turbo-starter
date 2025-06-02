import { Button, Group, type MantineColor, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
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
              <Text span>{t('areYouSureAboutThisAction')} </Text>
              <Text span bg="yellow.5">
                {t('actionCannotBeUndone')}
              </Text>
            </div>

            <Group grow>
              <Button variant="default" onClick={() => modals.close(modalId)}>
                {t('cancel')}
              </Button>

              <Button
                color={color}
                onClick={() => {
                  onConfirm();
                  modals.close(modalId);
                }}
              >
                {t('confirm')}
              </Button>
            </Group>
          </Stack>
        ),
      });
    },
  };
}
