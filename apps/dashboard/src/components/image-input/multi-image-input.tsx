import { uploadImageAction } from '@/server/actions/storage';
import { Center, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import type { FileObject } from '@repo/utils/types';
import { IconUpload } from '@tabler/icons-react';
import { useState } from 'react';
import { Preview, PreviewUploading } from './previews';
import type { UploadingFile } from './types';

interface MultiImageInputProps {
  files: FileObject[];
  setFiles: (files: FileObject[]) => void;
}

export function MultiImageInput({ files, setFiles }: MultiImageInputProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const handleDrop = async (droppedFiles: File[]) => {
    if (droppedFiles.length === 0) {
      return;
    }

    const newUploadingFiles = droppedFiles.map((file) => ({
      file,
      id: crypto.randomUUID(),
      uploadStatus: 'uploading' as const,
    }));

    setUploadingFiles((prev) => [...prev, ...newUploadingFiles]);
    const uploadPromises = newUploadingFiles.map(async (uploadingFile) => {
      try {
        const result = await uploadImageAction({
          file: uploadingFile.file,
          isPublic: true,
        });

        setUploadingFiles((current) => {
          return current.map((item) => {
            return item.id === uploadingFile.id
              ? { ...item, uploadStatus: 'done' as const }
              : item;
          });
        });

        return { uploadingFile, result };
      } catch {
        setUploadingFiles((current) => {
          return current.map((item) =>
            item.id === uploadingFile.id
              ? { ...item, uploadStatus: 'error' as const }
              : item,
          );
        });

        return { uploadingFile, result: null };
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((r) => r.result);
    const successfulUploadIds = successfulUploads.map((r) => r.uploadingFile.id);

    setUploadingFiles((current) => {
      return current.filter((item) => !successfulUploadIds.includes(item.id));
    });

    setFiles([
      ...files,
      ...successfulUploads.map((i) => ({
        id: i.result?.id || '',
        key: i.result?.key || '',
      })),
    ]);
  };

  return (
    <SimpleGrid cols={{ base: 1, sm: 4 }}>
      {files.map((file) => (
        <Preview
          file={file}
          key={file.id}
          onRemove={() => setFiles(files.filter((f) => f !== file))}
        />
      ))}

      {uploadingFiles.map((uploadItem) => (
        <PreviewUploading
          key={uploadItem.id}
          file={uploadItem.file}
          isUploading={uploadItem.uploadStatus === 'uploading'}
        />
      ))}

      <Dropzone p={0} accept={IMAGE_MIME_TYPE} onDrop={handleDrop} h={150}>
        <Center h={150}>
          <IconUpload size={64} color="var(--mantine-color-gray-5)" />
        </Center>
      </Dropzone>
    </SimpleGrid>
  );
}
