'use client';

import { NavLink } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ShellLink({
  label,
  icon,
  section,
  toggle,
  activeExact = false,
}: {
  label: string;
  section: string;
  icon: React.ReactNode;
  toggle?: () => void;
  activeExact?: boolean;
}) {
  const pathname = usePathname();

  return (
    <NavLink
      py={4}
      px={6}
      label={label}
      href={section}
      variant="filled"
      component={Link}
      onClick={toggle}
      leftSection={icon}
      active={activeExact ? pathname === section : pathname.startsWith(section)}
    />
  );
}
