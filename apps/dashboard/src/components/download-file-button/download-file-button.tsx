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
import type { UseQueryResult } from '@tanstack/react-query';
import { stringify } from 'csv-stringify/sync';
import dayjs from 'dayjs';
import saveAs from 'file-saver';
import { useTranslations } from 'next-intl';

function downloadCsv(data: unknown[], filename = 'data.csv') {
  const csvData = stringify(data, {
    header: true,
    cast: {
      date: (value) => dayjs(value).format('YYYY-MM-DDTHH:mm:ss'),
      number: (value) => value.toLocaleString(),
    },
  });

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
}

export function DownloadFileButton<T, U>({
  data = [],
  fileName = 'data',
  query,
}: {
  data?: T[];
  fileName?: string;
  query: UseQueryResult<U, unknown>;
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
              <Title order={3}>{t('downloadCsvFile.title')}</Title>
              <Text>{t('downloadCsvFile.description')}</Text>
            </Stack>
          </Group>

          <Button
            disabled={query.isLoading}
            leftSection={<IconFileDownload />}
            onClick={() => downloadCsv(data, fileName)}
          >
            {t('downloadCsvFile.download')}
          </Button>
        </Stack>
      </Modal>

      <Tooltip withArrow label={t('downloadCsvFile.tooltip')}>
        <ActionIcon size={36} onClick={open} variant="default">
          <IconFileDownload size={20} />
        </ActionIcon>
      </Tooltip>
    </>
  );
}
