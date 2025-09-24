import { Divider, Stack } from '@mantine/core';
import { Links } from './links';
import { QuickActions } from './quick-actions';

export function Sidebar() {
  return (
    <Stack gap={0} h="100%">
      <Links />
      <Divider mx="xs" color="gray.2" />
      <QuickActions />
    </Stack>
  );
}
