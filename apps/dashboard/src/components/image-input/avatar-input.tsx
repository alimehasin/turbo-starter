import { useNotifications } from '@/hooks/use-notifications';
import { uploadImageAction } from '@/server/actions/storage';
import { constructImageUrl } from '@/utils/helpers';
import { Avatar, Box, FileButton, LoadingOverlay } from '@mantine/core';
import type { FileObject } from '@repo/utils/types';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface AvatarInputProps {
  value: FileObject | undefined;
  onChange: (value: FileObject | undefined) => void;
}

export function AvatarInput({ value, onChange }: AvatarInputProps) {
  const t = useTranslations();
  const n = useNotifications();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File | null) => {
    if (!file) {
      return;
    }

    setLoading(true);
    uploadImageAction({ file, isPublic: true })
      .then((f) => onChange({ id: f.id, key: f.key }))
      .catch(() => n.error(t('uploadImageFailed')))
      .finally(() => setLoading(false));

    try {
      const f = await uploadImageAction({ file, isPublic: true });

      if (f.id && f.key) {
        onChange({ id: f.id, key: f.key });
      }
    } catch {
      n.error(t('uploadImageFailed'));
    }

    setLoading(false);
  };

  return (
    <FileButton onChange={handleUpload} accept="image/png,image/jpeg">
      {(props) => (
        <Box pos="relative" w="fit-content">
          <LoadingOverlay visible={loading} />

          <Avatar
            {...props}
            size={64}
            style={{ cursor: 'pointer' }}
            src={constructImageUrl(value?.key)}
          />
        </Box>
      )}
    </FileButton>
  );
}
