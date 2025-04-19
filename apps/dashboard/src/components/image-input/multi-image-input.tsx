import { uploadImageAction } from '@/server/actions/storage';
import { constructImageUrl } from '@/utils/helpers';
import { ActionIcon, Center, Image, Overlay } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Dropzone } from '@mantine/dropzone';
import { useHover } from '@mantine/hooks';
import { useNotifications } from '@repo/hooks';
import type { FileObject } from '@repo/utils/types';
import { IconUpload, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

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
        top={4}
        right={4}
        color="red"
        pos="absolute"
        onClick={onRemove}
        style={{ zIndex: 9999 }}
        display={hovered ? 'block' : 'none'}
      >
        <IconX />
      </ActionIcon>

      {hovered && <Overlay color="#000" backgroundOpacity={0.35} blur={5} />}
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
        }),
      );

      onChange([...value, ...uploadedFiles]);
    } catch {
      n.error(t('uploadImageFailed'));
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
  );
}
