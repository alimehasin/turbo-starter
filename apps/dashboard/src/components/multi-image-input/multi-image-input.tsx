'use client';

import { Center, SimpleGrid, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useUncontrolled } from '@mantine/hooks';
import type { FileObject } from '@repo/utils/types';
import { IconUpload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useNotifications } from '@/hooks/use-notifications';
import { uploadImageAction } from '@/server/actions/storage';
import { Preview } from './preview';

interface MultiImageInputProps {
  value?: FileObject[];
  defaultValue?: FileObject[];
  onChange: (value?: FileObject[]) => void;
  description?: string;
}

export function MultiImageInput({
  value,
  defaultValue,
  onChange,
  description,
}: MultiImageInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange,
  });

  const t = useTranslations();
  const n = useNotifications();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (files: File[]) => {
    setLoading(true);

    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const f = await uploadImageAction({ file, isPublic: true });
          return { id: f.id, key: f.key };
        }),
      );

      handleChange([..._value, ...uploadedFiles]);
    } catch {
      n.error(t('_.uploadImageFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, sm: 4 }}>
        {_value.map((file) => (
          <Preview
            file={file}
            key={file.id}
            onRemove={() => handleChange(_value.filter((f) => f.id !== file.id))}
          />
        ))}

        <Dropzone
          p={0}
          h={150}
          loading={loading}
          onDrop={handleUpload}
          accept={IMAGE_MIME_TYPE}
        >
          <Center h={150}>
            <IconUpload size={64} color="var(--mantine-color-gray-5)" />
          </Center>
        </Dropzone>
      </SimpleGrid>

      {description && <Text c="gray">{description}</Text>}
    </Stack>
  );
}
