import clsx from 'clsx';
import React, { useRef } from 'react';

import { AnimateIconBaseSize } from '@/shared/ui/animate-icon-base';

import { useComponentSize } from '../../lib/hooks/use-component-size';
import { useForkRef } from '../../lib/hooks/use-fork-ref';
import { cn } from '../../lib/tailwind-merge';
import { ArrorDownIcon } from '../svg';
import { Typography } from '../typography';
import styles from './Collapse.module.scss';
import { CollapseIcon } from './CollapseIcon';
import {
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIconDefault,
  collapsePropIconPositionDefault,
  CollapseProps,
} from './types';

function renderSide(side: React.ReactNode): React.ReactNode {
  const sides = side ? [...(Array.isArray(side) ? side : [side])] : [];

  return sides.map((item, index) => <div key={index}>{item}</div>);
}

const getMaxHeight = (height: number, maxHeight?: number | string) => {
  if (maxHeight) {
    return typeof maxHeight === 'string' ? maxHeight : `${maxHeight}px`;
  }
  return `${height}px`;
};

export type CollapseSize = 'm' | 'l';

const sizeIconMap: Record<CollapseSize, 's' | AnimateIconBaseSize> = {
  m: 's',
  l: 'm',
};

export const Collapse: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<CollapseProps & { size?: CollapseSize }> &
    React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, CollapseProps & { size?: CollapseSize }>(
  (props, ref) => {
    const collapseRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { height: contentHeight } = useComponentSize(
      contentRef as React.RefObject<HTMLElement>,
    );

    const {
      label,
      className,
      labelClassName,
      iconClassName,
      maxContentHeight,
      isOpen,
      children,
      icon = ArrorDownIcon,
      closeIcon,
      rightSide,
      iconPosition = collapsePropIconPositionDefault,
      directionIcon = collapsePropDirectionIconDefault,
      closeDirectionIcon = collapsePropCloseDirectionIconDefault,
      size = 'm',
      style,
      ...otherProps
    } = props;

    const iconProps = {
      className: clsx(styles.icon, iconClassName),
      size: sizeIconMap[size || 'm'],
      icon,
      closeIcon,
      isOpen,
      direction: directionIcon,
      closeDirection: closeDirectionIcon,
    };

    return (
      <div
        ref={useForkRef([ref, collapseRef])}
        className={clsx(styles[`collapse_${size}`], className)}
        style={style}
      >
        <div
          className={styles.label}
          {...otherProps}
        >
          {iconPosition === 'left' && <CollapseIcon {...iconProps} />}
          {typeof label === 'object' ? (
            <div
              className={cn(
                styles[`size_${size}`],
                styles.labelText,
                labelClassName,
              )}
            >
              {label}
            </div>
          ) : (
            <Typography
              variant="title3"
              className={clsx(styles.labelText, labelClassName)}
              colors="primary"
            >
              {label}
            </Typography>
          )}
          {renderSide(rightSide)}
          {iconPosition === 'right' && (
            <span className={styles.iconWrapper}>
              <CollapseIcon {...iconProps} />
            </span>
          )}
        </div>
        <div
          style={{
            ['--collapse-body-max-height' as string]: getMaxHeight(
              contentHeight,
              maxContentHeight,
            ),
          }}
          className={clsx(styles.body, { [styles.open]: isOpen })}
        >
          <div
            ref={contentRef}
            className={styles.content}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

export * from './types';
