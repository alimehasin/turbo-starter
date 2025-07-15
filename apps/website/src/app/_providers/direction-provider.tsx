'use client';

import { Direction } from 'radix-ui';

export function DirectionProvider({
  dir,
  children,
}: {
  dir: 'ltr' | 'rtl';
  children: React.ReactNode;
}) {
  return <Direction.Provider dir={dir}>{children}</Direction.Provider>;
}
