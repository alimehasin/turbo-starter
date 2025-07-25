'use client';

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@/utils/constants';
import { Header } from './header';
import { Sidebar } from './sidebar';

export function Shell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
      navbar={{
        breakpoint: 'md',
        width: SIDEBAR_WIDTH,
        collapsed: { mobile: !opened },
      }}
      padding={{ base: 'xs', md: 'md' }}
    >
      <AppShellHeader>
        <Header opened={opened} toggle={toggle} />
      </AppShellHeader>

      <AppShellNavbar>
        <Sidebar toggle={toggle} />
      </AppShellNavbar>

      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
