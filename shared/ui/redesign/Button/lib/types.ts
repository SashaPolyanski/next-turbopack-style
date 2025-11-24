import { ButtonHTMLAttributes, FC, Ref, SVGProps } from 'react';

export type Theme = Record<
  'dark' | 'gray' | 'white' | 'purple' | 'accent',
  'primary' | 'secondary' | 'clear'
>;

export type BaseButtonProps = {
  children?: string;
  className?: string;
  disabled?: boolean;
  iconRight?: FC<SVGProps<SVGElement>>;
  iconLeft?: FC<SVGProps<SVGElement>>;
  onlyIcon?: boolean;
  isActive?: boolean;
  badgeClassName?: string;
  iconClassName?: string;
  size?: 's' | 'm' | 'l';
  'data-name'?: string;
  href?: string;
  target?: '_blank' | '_self';
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonThemeComponentProps<T extends keyof Theme> = {
  view: Theme[T];
  ref?: Ref<HTMLButtonElement>;
} & BaseButtonProps;
