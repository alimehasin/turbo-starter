'use client';

import {
  ActionIcon,
  Button,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFileDownload } from '@tabler/icons-react';
import type { UseTRPCQueryResult } from '@trpc/react-query/shared';
import { useTranslations } from 'next-intl';
import { downloadCsv } from './helpers';

export function DownloadCsvButton<T, U>({
  data = [],
  fileName = 'data',
  query,
}: {
  data?: T[];
  fileName?: string;
  query: UseTRPCQueryResult<U, unknown>;
}) {
  const t = useTranslations();
  const [opened, { open, close }] = useDisclosure(false, {
    onOpen: () => {
      query.refetch();
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Stack>
          <Group wrap="nowrap">
            <ThemeIcon size={96} variant="light">
              {query.isLoading ? (
                <Loader size={48} />
              ) : (
                <IconFileDownload size={48} />
              )}
            </ThemeIcon>

            <Stack gap="xs">
              <Title order={3}>{t('downloadCsvButton.title')}</Title>
              <Text>{t('downloadCsvButton.description')}</Text>
            </Stack>
          </Group>

          <Button
            disabled={query.isLoading}
            leftSection={<IconFileDownload />}
            onClick={() => downloadCsv(data, fileName)}
          >
            {t('downloadCsvButton.download')}
          </Button>
        </Stack>
      </Modal>

      <Tooltip withArrow label={t('downloadCsvButton.tooltip')}>
        <ActionIcon size={36} onClick={open} variant="default">
          <IconFileDownload />
        </ActionIcon>
      </Tooltip>
    </>
  );
}
