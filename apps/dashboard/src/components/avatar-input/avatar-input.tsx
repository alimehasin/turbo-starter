'use client';

import { Avatar, Box, FileButton, LoadingOverlay } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import type { FileObject } from '@repo/utils/types';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useNotifications } from '@/hooks/use-notifications';
import { uploadImageAction } from '@/server/actions/storage';
import { constructImageUrl } from '@/utils/helpers';

interface AvatarInputProps {
  value?: FileObject;
  defaultValue?: FileObject;
  onChange: (value?: FileObject) => void;
}

export function AvatarInput({ value, defaultValue, onChange }: AvatarInputProps) {
  const t = useTranslations();
  const n = useNotifications();
  const [loading, setLoading] = useState(false);

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: undefined,
    onChange,
  });

  const handleUpload = async (file: File | null) => {
    if (!file) {
      return;
    }

    setLoading(true);
    uploadImageAction({ file, isPublic: true })
      .then((f) => handleChange({ id: f.id, key: f.key }))
      .catch(() => n.error(t('_.uploadImageFailed')))
      .finally(() => setLoading(false));

    try {
      const f = await uploadImageAction({ file, isPublic: true });

      if (f.id && f.key) {
        handleChange({ id: f.id, key: f.key });
      }
    } catch {
      n.error(t('_.uploadImageFailed'));
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
            src={constructImageUrl(_value?.key)}
          />
        </Box>
      )}
    </FileButton>
  );
}
