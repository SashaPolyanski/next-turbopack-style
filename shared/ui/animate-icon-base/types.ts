import { FC, SVGProps } from 'react';

export type AnimateIconBaseWithoutSizeProps = {
  icons: Array<FC<SVGProps<SVGElement>>>;
  directions?: Array<number>;
  transition?: number;
  activeIndex?: number;
};
