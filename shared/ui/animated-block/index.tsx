'use client';

import clsx from 'clsx';
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import styles from './AnimatedBlock.module.scss';

type AnimatedBlockProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  className?: string;
};
export const AnimatedBlock = ({
  children,
  className,
  ...componentProps
}: AnimatedBlockProps) => {
  const { isIntersecting, ref } = useIntersectionObserver();
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isIntersecting && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isIntersecting, hasBeenVisible]);

  return (
    <div
      ref={ref}
      className={clsx(
        styles.wrapper,
        {
          [styles.visible]: hasBeenVisible,
          [styles.hidden]: !hasBeenVisible,
        },
        className,
      )}
      {...componentProps}
    >
      {children}
    </div>
  );
};
