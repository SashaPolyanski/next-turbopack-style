import React from 'react';

import { isNotNil } from '../../lib/is-not-nil';
import { forwardRefWithAs } from '../../lib/types/props-with-as-attributes';
import { AnimateIconBase } from '../animate-icon-base';
import { AnimateIconSwitcherProps } from './types';

export const AnimateIconSwitcher = forwardRefWithAs<
  AnimateIconSwitcherProps,
  'span'
>((props, ref) => {
  const {
    startIcon,
    startDirection = 0,
    endIcon,
    endDirection = 0,
    active,
    ...otherProps
  } = props;

  return (
    <AnimateIconBase
      {...otherProps}
      ref={ref}
      activeIndex={active ? 1 : 0}
      // @ts-ignore
      icons={[startIcon, endIcon].filter(isNotNil)}
      directions={
        startDirection || endDirection
          ? [startDirection, endDirection]
          : undefined
      }
    />
  );
});
