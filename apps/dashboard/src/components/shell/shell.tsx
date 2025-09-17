"use client";

import { AppShell, AppShellHeader, AppShellNavbar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SHELL_NAVBAR_HEIGHT, SHELL_SIDEBAR_WIDTH } from "@/utils/constants";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function Shell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      padding="md"
      header={{ height: SHELL_NAVBAR_HEIGHT }}
      navbar={{
        breakpoint: "sm",
        width: SHELL_SIDEBAR_WIDTH,
        collapsed: { mobile: !opened },
      }}
    >
      <AppShellHeader bg="transparent" bd={0}>
        <Header opened={opened} toggle={toggle} />
      </AppShellHeader>

      <AppShellNavbar>
        <Sidebar />
      </AppShellNavbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
