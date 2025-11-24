import { FC, SVGProps } from 'react';

import { AnimateIconBaseSize } from '../animate-icon-base';

export type AnimateIconSwitcherProps = {
  startIcon?: FC<SVGProps<SVGElement>>;
  endIcon?: FC<SVGProps<SVGElement>>;
  startDirection?: number;
  endDirection?: number;
  transition?: number;
  active?: boolean;
  size?: AnimateIconBaseSize;
};
