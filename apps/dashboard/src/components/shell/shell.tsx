'use client';

import { AppShell, AppShellNavbar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SHELL_SIDEBAR_WIDTH } from '@/utils/constants';
import { Sidebar } from './sidebar';

export function Shell({ children }: { children: React.ReactNode }) {
  const [opened] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      padding="md"
      navbar={{
        breakpoint: 'sm',
        width: SHELL_SIDEBAR_WIDTH,
        collapsed: { mobile: !opened },
      }}
    >
      <AppShellNavbar>
        <Sidebar />
      </AppShellNavbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
