import type { MantineColor } from '@mantine/core';
import { Group, Image, Text, ThemeIcon } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import type { FileObject } from '@repo/utils/types';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useNotifications } from '@/hooks/use-notifications';
import { uploadImageAction } from '@/server/actions/storage';
import { constructImageUrl } from '@/utils/helpers';

function DropzoneState({
  color,
  icon,
  message,
}: {
  color: MantineColor;
  icon: React.ReactNode;
  message: string;
}) {
  return (
    <Group h={150} justify="center" p="sm">
      <ThemeIcon color={color} variant="transparent">
        {icon}
      </ThemeIcon>

      <Text ta="center">{message}</Text>
    </Group>
  );
}

interface SingleImageInputProps {
  value: FileObject | undefined;
  onChange: (value: FileObject | undefined) => void;
}

export function SingleImageInput({ value, onChange }: SingleImageInputProps) {
  const t = useTranslations();
  const n = useNotifications();
  const [loading, setLoading] = useState(false);

  const handleUpload = (files: File[]) => {
    const file = files[0];

    if (!file) {
      return;
    }

    setLoading(true);
    uploadImageAction({ file, isPublic: true })
      .then((f) => onChange({ id: f.id, key: f.key }))
      .catch(() => n.error(t('common.uploadImageFailed')))
      .finally(() => setLoading(false));
  };

  return (
    <Dropzone
      accept={IMAGE_MIME_TYPE}
      loading={loading}
      maxSize={5 * 1024 ** 2}
      multiple={false}
      onDrop={handleUpload}
      p="xs"
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
        {value ? (
          <Image
            alt="Image"
            h={200}
            radius="md"
            src={constructImageUrl(value.key)}
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
  );
}
