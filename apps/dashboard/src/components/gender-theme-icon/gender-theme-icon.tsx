import { ThemeIcon, type ThemeIconProps } from '@mantine/core';
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';

interface GenderThemeIconProps extends ThemeIconProps {
  gender: string;
}

export function GenderThemeIcon({ gender, ...props }: GenderThemeIconProps) {
  return (
    <ThemeIcon color={gender === 'male' ? 'blue' : 'pink'} {...props}>
      {gender === 'male' ? <IconGenderMale /> : <IconGenderFemale />}
    </ThemeIcon>
  );
}
