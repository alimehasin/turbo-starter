import {
  ActionIcon,
  Button,
  Checkbox,
  Container,
  DEFAULT_THEME,
  Input,
  Menu,
  NavLink,
  NumberInput,
  createTheme,
} from '@mantine/core';
import { Spotlight } from '@mantine/spotlight';
import { rubik } from './fonts/rubik';
import cls from './theme.module.css';

export const theme = createTheme({
  fontFamily: rubik.style.fontFamily,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: `${rubik.style.fontFamily}, ${DEFAULT_THEME.fontFamily}` },

  primaryColor: 'red',
  defaultRadius: DEFAULT_THEME.radius.md,

  components: {
    Container: Container.extend({
      classNames: { root: cls.container },
    }),

    Spotlight: Spotlight.extend({
      classNames: { search: cls.noInputRing },
    }),

    Checkbox: Checkbox.extend({
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
