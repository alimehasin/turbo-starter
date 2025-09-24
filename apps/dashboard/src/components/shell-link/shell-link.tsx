'use client';

import { NavLink } from '@mantine/core';
import type { TablerIcon } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ShellLink({
  label,
  icon: Icon,
  path,
  toggle,
  activeExact = false,
}: {
  label: string;
  path: string;
  icon: TablerIcon;
  toggle?: () => void;
  activeExact?: boolean;
}) {
  const pathname = usePathname();

  return (
    <NavLink
      py={6}
      px={10}
      href={path}
      bdrs="100vw"
      label={label}
      variant="filled"
      component={Link}
      onClick={toggle}
      leftSection={<Icon size={20} />}
      active={activeExact ? pathname === path : pathname.startsWith(path)}
    />
  );
}
