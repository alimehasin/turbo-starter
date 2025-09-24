import {
  ActionIcon,
  createTheme,
  DEFAULT_THEME,
  type MantineColorsTuple,
  Modal,
  virtualColor,
} from '@mantine/core';
import { rubik } from './fonts/rubik';

export const theme = createTheme({
  fontFamily: rubik.style.fontFamily,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: `${rubik.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  },

  primaryColor: 'primary',
  defaultRadius: 'lg',

  colors: {
    primary: [
      '#accecd',
      '#98c2c1',
      '#83b6b5',
      '#6eaaaa',
      '#579e9e',
      '#3f9292',
      '#1f8687',
      '#197475',
      '#146263',
      '#0f5151',
    ],

    secondary: [
      '#ffceae',
      '#ffc299',
      '#ffb584',
      '#ffa86e',
      '#ff9a56',
      '#ff8c39',
      '#fe7e00',
      '#dd6d00',
      '#bd5c00',
      '#9e4c00',
    ],

    grayInDark:
      DEFAULT_THEME.colors.dark.toReversed() as unknown as MantineColorsTuple,

    nature: virtualColor({
      name: 'nature',
      light: 'gray',
      dark: 'grayInDark',
    }),
  },

  components: {
    Modal: Modal.extend({
      defaultProps: { withCloseButton: false },
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: { size: 'lg' },
    }),
  },
});
