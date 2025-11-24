import React from 'react';

import { AnimateIconSwitcher } from '../animate-icon-switcher';
import { CollapseIconPropDirection, CollapseIconProps } from './types';

const directionsMap: Record<CollapseIconPropDirection, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
  upRight: 45,
  downRight: 135,
  downLeft: 225,
  upLeft: 315,
};

export const CollapseIcon: React.FC<CollapseIconProps> = (props) => {
  const {
    size,
    icon: Icon,
    closeIcon: CloseIcon,
    direction,
    closeDirection,
    isOpen,
    ...otherProps
  } = props;

  return (
    <AnimateIconSwitcher
      startIcon={Icon}
      endIcon={CloseIcon}
      transition={300}
      size={size}
      active={isOpen}
      startDirection={
        !CloseIcon && direction ? directionsMap[direction] : undefined
      }
      endDirection={
        !CloseIcon && closeDirection ? directionsMap[closeDirection] : undefined
      }
      {...otherProps}
    />
  );
};
