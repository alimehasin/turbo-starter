import { Center, ThemeIcon, type ThemeIconProps } from '@mantine/core';
import type { Gender } from '@prisma/client';
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';

interface GenderThemeIconProps extends ThemeIconProps {
  gender: Gender;
}

export function GenderThemeIcon({ gender, ...props }: GenderThemeIconProps) {
  return (
    <Center>
      <ThemeIcon
        variant="transparent"
        color={gender === 'Female' ? 'pink' : 'blue'}
        {...props}
      >
        {gender === 'Female' ? <IconGenderFemale /> : <IconGenderMale />}
      </ThemeIcon>
    </Center>
  );
}
