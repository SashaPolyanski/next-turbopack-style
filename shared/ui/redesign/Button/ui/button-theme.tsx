import React, { ReactNode } from 'react';

import {
  BaseButtonProps,
  ButtonThemeComponentProps,
  Theme,
} from '../lib/types';
import { ButtonAccent } from './button-accent';
import { ButtonDark } from './button-dark';
import { ButtonGray } from './button-gray';
import { ButtonPurple } from './button-purple';
import { ButtonWhite } from './button-white';

type ThemeComponent<T extends keyof Theme> = (
  props: ButtonThemeComponentProps<T>,
) => React.ReactNode;
const buttonComponents: {
  [T in keyof Theme]: ThemeComponent<T>;
} = {
  dark: ButtonDark,
  gray: ButtonGray,
  white: ButtonWhite,
  purple: ButtonPurple,
  accent: ButtonAccent,
};

type ThemeButtonProps<T extends keyof Theme> = {
  theme?: T;
  children?: ReactNode;
  view?: Theme[T];
} & BaseButtonProps;

export const ButtonTheme = <T extends keyof Theme>({
  theme,
  children,
  view = 'primary',
  ...props
}: ThemeButtonProps<T>) => {
  const defaultTheme = theme || 'dark';
  const ButtonComponent = buttonComponents[defaultTheme] as ThemeComponent<T>;

  return (
    <ButtonComponent
      {...props}
      view={view}
    >
      {children}
    </ButtonComponent>
  );
};
