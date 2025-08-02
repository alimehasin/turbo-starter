'use client';

import { ActionIcon, Image, Overlay } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import type { FileObject } from '@repo/utils/types';
import { IconX } from '@tabler/icons-react';
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

      {hovered && <Overlay color="#000" backgroundOpacity={0.25} blur={1} />}
    </div>
  );
}
