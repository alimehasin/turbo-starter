import { constructImageUrl } from '@/utils/helpers';
import { ActionIcon, Image, LoadingOverlay, Overlay } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import type { FileObject } from '@repo/utils/types';
import { IconX } from '@tabler/icons-react';
import cls from './styles.module.css';

export function PreviewUploading({
  file,
  isUploading = false,
}: {
  file: File;
  isUploading?: boolean;
}) {
  const imageUrl = URL.createObjectURL(file);

  return (
    <div className={cls.previewContainer}>
      <Image h={150} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />

      <LoadingOverlay
        zIndex={100}
        visible={isUploading}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
    </div>
  );
}

export function Preview({
  file,
  onRemove,
}: {
  file: FileObject;
  onRemove: () => void;
}) {
  const { hovered, ref } = useHover();

  return (
    <div ref={ref} className={cls.previewContainer}>
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
