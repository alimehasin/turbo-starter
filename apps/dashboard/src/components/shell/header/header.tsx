import { Box, Burger, Center, Group, Title } from '@mantine/core';
import { SIDEBAR_WIDTH } from '@/utils/constants';
import { ColorSchemeButton } from './buttons/color-scheme-button';
import { LangButton } from './buttons/lang-button';
import { UserButton } from './buttons/user-button';
import { Spotlight } from './spotlight';
import cls from './styles.module.css';

export function Logo() {
  return (
    <Center h="100%">
      <Title order={3}>Ali Mehasin</Title>
    </Center>
  );
}

export function Header({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <>
      <Group h="100%" hiddenFrom="md">
        <Burger mx="md" onClick={toggle} opened={opened} size="sm" />
        <Logo />
      </Group>

      <Group h="100%" justify="space-between" visibleFrom="md">
        <Box className={cls.logo} h="100%" w={SIDEBAR_WIDTH}>
          <Logo />
        </Box>

        <Group justify="space-between" style={{ flexGrow: 1 }}>
          <Spotlight />

          <Group gap="xs" mx="xl">
            <UserButton />
            <ColorSchemeButton />
            <LangButton />
          </Group>
        </Group>
      </Group>
    </>
  );
}
