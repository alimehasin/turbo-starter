import { uploadImageAction } from '@/server/actions/storage';
import { Group, type MantineColor, Stack, Text, ThemeIcon } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import type { FileObject } from '@repo/utils/types';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Preview, PreviewUploading } from './previews';
import type { UploadingFile } from './types';

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
    <Group justify="center" p="sm">
      <ThemeIcon color={color} variant="transparent">
        {icon}
      </ThemeIcon>

      <Text ta="center">{message}</Text>
    </Group>
  );
}

interface SingleImageInputProps {
  file: FileObject | undefined;
  setFile: (file: FileObject | undefined) => void;
}

export function SingleImageInput({ file, setFile }: SingleImageInputProps) {
  const t = useTranslations();

  const [uploadingFile, setUploadingFile] = useState<UploadingFile | null>(null);

  const handleDrop = async (droppedFiles: File[]) => {
    if (droppedFiles.length === 0) {
      return;
    }

    const fileToUpload = droppedFiles[0];

    const newUploadingFile: UploadingFile = {
      file: fileToUpload as File,
      id: crypto.randomUUID(),
      uploadStatus: 'uploading' as const,
    };

    setUploadingFile(newUploadingFile);

    try {
      const result = await uploadImageAction({
        file: fileToUpload,
        isPublic: true,
      });

      setUploadingFile((current) => {
        return current?.id === newUploadingFile.id
          ? { ...current, uploadStatus: 'done' as const }
          : current;
      });

      if (result?.id && result?.key) {
        setFile({
          id: result.id,
          key: result.key,
        });
      }

      setTimeout(() => {
        setUploadingFile(null);
      }, 500);
    } catch {
      setUploadingFile((current) => {
        return current?.id === newUploadingFile.id
          ? { ...current, uploadStatus: 'error' as const }
          : current;
      });

      setTimeout(() => {
        setUploadingFile(null);
      }, 2000);
    }
  };

  return (
    <Stack gap="xs">
      <Dropzone
        p="xs"
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        onDrop={handleDrop}
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
          <DropzoneState
            color="gray"
            icon={<IconPhoto size={52} />}
            message={t('dropzone.idle')}
          />
        </Dropzone.Idle>
      </Dropzone>

      {uploadingFile && (
        <PreviewUploading
          file={uploadingFile.file}
          isUploading={uploadingFile.uploadStatus === 'uploading'}
        />
      )}

      {file && !uploadingFile && (
        <Preview file={file} onRemove={() => setFile(undefined)} />
      )}
    </Stack>
  );
}
