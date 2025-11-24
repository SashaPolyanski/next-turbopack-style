import { clsx } from 'clsx';
import React from 'react';
import { Transition } from 'react-transition-group';

import { useRefs } from '../../lib/hooks/use-refs';
import { cn } from '../../lib/tailwind-merge';
import { forwardRefWithAs } from '../../lib/types/props-with-as-attributes';
import styles from './animate-icon-base.module.scss';
import { AnimateIconBaseWithoutSizeProps } from './types';

export type AnimateIconBaseSize = 's' | 'm';

export const AnimateIconBase = forwardRefWithAs<
  AnimateIconBaseWithoutSizeProps & { size?: AnimateIconBaseSize },
  'span'
>((props, ref) => {
  const {
    className,
    activeIndex = 0,
    icons,
    directions,
    transition = 200,
    as = 'span',
    style,
    size,
    ...otherProps
  } = props;
  const refs = useRefs<HTMLElement>(icons.length);

  const SingleIcon = icons[0];

  const Tag = as as string;

  const innerRender =
    icons.length === 1 ? (
      <SingleIcon className={clsx(styles.icon, styles[`size_${size}`])} />
    ) : (
      icons.map((Icon, index) => (
        <Transition
          in={activeIndex === index}
          key={index}
          unmountOnExit
          timeout={transition}
          nodeRef={refs[index]}
        >
          {(animate) => (
            <span
              ref={refs[index]}
              className={cn(
                styles.iconWrapper,
                styles[`animate-${animate}`],
                styles[`size_${size}`],
              )}
            >
              <Icon className={styles.icon} />
            </span>
          )}
        </Transition>
      ))
    );

  return (
    <Tag
      {...otherProps}
      className={cn(
        styles.iconWrapper,
        styles.tag,
        styles[`size_${size}`],
        className,
      )}
      ref={ref}
      style={{
        ...style,
        ['--animate-icon-transition' as string]: `${transition}ms`,
        ...(typeof directions?.[activeIndex] === 'number' && {
          ['--animate-icon-direction' as string]: `rotate(${directions[activeIndex]}deg)`,
        }),
      }}
    >
      {innerRender}
    </Tag>
  );
});
