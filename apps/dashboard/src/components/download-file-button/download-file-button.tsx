import { ActionIcon } from '@mantine/core';
import { IconFileDownload } from '@tabler/icons-react';

export function DownloadFileButton({ onClick }: { onClick: () => void }) {
  return (
    <ActionIcon size={36} variant="default" onClick={onClick}>
      <IconFileDownload />
    </ActionIcon>
  );
}
