import type { MantineColor, ThemeIconVariant } from '@mantine/core';
import { Center, ThemeIcon } from '@mantine/core';
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';

export function getGenderColor(gender: string): MantineColor {
  switch (gender) {
    case 'Male': {
      return 'blue.6';
    }

    case 'Female': {
      return 'pink.6';
    }

    default: {
      return 'gray';
    }
  }
}

export function getGenderIcon(gender: string, size = 24): React.ReactElement {
  switch (gender) {
    case 'Male': {
      return <IconGenderMale size={size} />;
    }

    case 'Female': {
      return <IconGenderFemale size={size} />;
    }

    default: {
      return <></>;
    }
  }
}

export function getGenderThemeIcon({
  gender,
  variant = 'transparent',
}: {
  gender: string;
  variant?: ThemeIconVariant;
}): React.ReactElement {
  return (
    <Center>
      <ThemeIcon size="lg" variant={variant} color={getGenderColor(gender)}>
        {getGenderIcon(gender)}
      </ThemeIcon>
    </Center>
  );
}
