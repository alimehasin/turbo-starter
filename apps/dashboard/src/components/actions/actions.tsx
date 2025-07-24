'use client';

import { ActionIcon, Center, Menu } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';

export function Actions({ children }: { children: React.ReactNode }) {
  return (
    <div onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
      <Menu withArrow>
        <Menu.Target>
          <Center>
            <ActionIcon color="gray" variant="transparent">
              <IconDots />
            </ActionIcon>
          </Center>
        </Menu.Target>

        <Menu.Dropdown miw={160}>{children}</Menu.Dropdown>
      </Menu>
    </div>
  );
}
