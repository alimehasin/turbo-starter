'use client';

import { downloadCsv } from '@/utils/helpers';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconFileDownload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export function DownloadFileButton<T>({
  data = [],
  fileName = 'data',
}: {
  data?: T[];
  fileName?: string;
}) {
  const t = useTranslations();

  return (
    <Tooltip withArrow label={t('downloadCsvFile')}>
      <ActionIcon
        size={36}
        variant="default"
        onClick={() => downloadCsv(data, fileName)}
      >
        <IconFileDownload />
      </ActionIcon>
    </Tooltip>
  );
}
