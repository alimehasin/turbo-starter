import {
  ActionIcon,
  Button,
  Checkbox,
  CheckboxIndicator,
  Container,
  createTheme,
  DEFAULT_THEME,
  Input,
  type MantineColorsTuple,
  Menu,
  Modal,
  NavLink,
  NumberInput,
  virtualColor,
} from '@mantine/core';
import { rubik } from './fonts/rubik';
import cls from './theme.module.css';

export const theme = createTheme({
  fontFamily: rubik.style.fontFamily,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: `${rubik.style.fontFamily}, ${DEFAULT_THEME.fontFamily}` },

  primaryColor: 'primary',
  defaultRadius: DEFAULT_THEME.radius.md,

  colors: {
    primary: [
      '#ecf4ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc0',
      '#5f7cb7',
      '#5474b4',
      '#44639f',
      '#3a5890',
      '#2c4b80',
    ],

    secondary: [
      '#fff2e3',
      '#ffe4cf',
      '#f9c8a1',
      '#f4a261',
      '#f19044',
      '#ef8029',
      '#ef7819',
      '#d5660c',
      '#be5906',
      '#a64b00',
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

    Container: Container.extend({
      defaultProps: { size: 'xl' },
      classNames: { root: cls.container },
    }),

    Checkbox: Checkbox.extend({
      defaultProps: { radius: 'sm' },
    }),

    CheckboxIndicator: CheckboxIndicator.extend({
      defaultProps: { radius: 'sm' },
    }),

    Button: Button.extend({
      classNames: { root: cls.button },
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: { size: 'lg' },
      classNames: { root: cls.actionIcon },
    }),

    Menu: Menu.extend({
      classNames: {
        dropdown: cls.menuDropdown,
        item: cls.menuItem,
      },
    }),

    Input: Input.extend({
      classNames: { input: cls.input },
    }),

    NumberInput: NumberInput.extend({
      classNames: { root: cls.numberInput },
    }),

    NavLink: NavLink.extend({
      classNames: { root: cls.navLink },
    }),
  },
});
