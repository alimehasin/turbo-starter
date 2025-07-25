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
      active={activeExact ? pathname === section : pathname.startsWith(section)}
      component={Link}
      href={section}
      label={label}
      leftSection={icon}
      onClick={toggle}
      px={6}
      py={4}
      variant="filled"
    />
  );
}
