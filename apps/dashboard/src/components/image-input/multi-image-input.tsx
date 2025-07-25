import { ActionIcon, Center, Image, Overlay, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useHover } from '@mantine/hooks';
import type { FileObject } from '@repo/utils/types';
import { IconUpload, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useNotifications } from '@/hooks/use-notifications';
import { uploadImageAction } from '@/server/actions/storage';
import { constructImageUrl } from '@/utils/helpers';

export function Preview({
  file,
  onRemove,
}: {
  file: FileObject;
  onRemove: () => void;
}) {
  const { hovered, ref } = useHover();

  return (
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 'var(--mantine-radius-default)',
      }}
    >
      <Image h={150} src={constructImageUrl(file.key)} />

      <ActionIcon
        color="red"
        display={hovered ? 'block' : 'none'}
        onClick={onRemove}
        pos="absolute"
        right={4}
        style={{ zIndex: 9999 }}
        top={4}
      >
        <IconX />
      </ActionIcon>

      {hovered && <Overlay backgroundOpacity={0.35} blur={5} color="#000" />}
    </div>
  );
}

interface MultiImageInputProps {
  value: FileObject[];
  onChange: (value: FileObject[]) => void;
}

export function MultiImageInput({ value, onChange }: MultiImageInputProps) {
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
        })
      );

      onChange([...value, ...uploadedFiles]);
    } catch {
      n.error(t('common.uploadImageFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleGrid cols={{ base: 1, sm: 4 }}>
      {value.map((file) => (
        <Preview
          file={file}
          key={file.id}
          onRemove={() => onChange(value.filter((f) => f.id !== file.id))}
        />
      ))}

      <Dropzone
        accept={IMAGE_MIME_TYPE}
        h={150}
        loading={loading}
        onDrop={handleUpload}
        p={0}
      >
        <Center h={150}>
          <IconUpload color="var(--mantine-color-gray-5)" size={64} />
        </Center>
      </Dropzone>
    </SimpleGrid>
  );
}
