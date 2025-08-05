'use client';

import { Image, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useUncontrolled } from '@mantine/hooks';
import type { FileObject } from '@repo/utils/types';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useNotifications } from '@/hooks/use-notifications';
import { uploadImageAction } from '@/server/actions/storage';
import { constructImageUrl } from '@/utils/helpers';
import { DropzoneState } from './dropzone-state';

interface SingleImageInputProps {
  value?: FileObject;
  defaultValue?: FileObject;
  onChange: (value?: FileObject) => void;
  error?: string;
  description?: string;
}

export function SingleImageInput({
  value,
  defaultValue,
  onChange,
  error,
  description,
}: SingleImageInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: undefined,
    onChange,
  });

  const t = useTranslations();
  const n = useNotifications();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (files: File[]) => {
    const file = files[0];

    if (!file) {
      return;
    }

    setLoading(true);
    uploadImageAction({ file, isPublic: true })
      .then((f) => handleChange({ id: f.id, key: f.key }))
      .catch(() => n.error(t('_.uploadImageFailed')))
      .finally(() => setLoading(false));
  };

  return (
    <Stack gap={4}>
      <Dropzone
        p="xs"
        multiple={false}
        loading={loading}
        onDrop={handleUpload}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Dropzone.Accept>
          <DropzoneState
            color="blue"
            icon={<IconUpload size={52} />}
            message={t('dropzone.accept')}
          />
        </Dropzone.Accept>

        <Dropzone.Reject>
          <DropzoneState
            color="red"
            icon={<IconX size={52} />}
            message={t('dropzone.reject')}
          />
        </Dropzone.Reject>

        <Dropzone.Idle>
          {_value ? (
            <Image
              h={200}
              alt="Image"
              radius="md"
              src={constructImageUrl(_value.key)}
            />
          ) : (
            <DropzoneState
              color="gray"
              icon={<IconPhoto size={52} />}
              message={t('dropzone.idle')}
            />
          )}
        </Dropzone.Idle>
      </Dropzone>

      {description && <Text c="gray">{description}</Text>}

      {error && (
        <Text fz={14} c="red">
          {error}
        </Text>
      )}
    </Stack>
  );
}
