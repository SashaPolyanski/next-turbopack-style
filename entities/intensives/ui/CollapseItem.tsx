'use client';

import clsx from 'clsx';
import { ReactNode, useId, useState } from 'react';

import { Collapse } from '@/shared/ui/collapse';
import { IconMinus, IconPlus } from '@/shared/ui/svg';
import { Typography } from '@/shared/ui/typography';

import styles from './CollapseItem.module.scss';

type CollapseItemProps = {
  label: string | ReactNode;
  children: ReactNode | string;
  className?: string;
  descriptionClassName?: string;
};

export const CollapseItem = ({
  label,
  children,
  className,
  descriptionClassName = '',
}: CollapseItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      key={id}
      className={clsx(styles.container, className)}
    >
      <Collapse
        labelClassName={styles.label}
        size="l"
        label={label}
        isOpen={isOpen}
        onClick={toggle}
        icon={IconPlus}
        closeIcon={IconMinus}
      >
        <Typography
          colors="primary"
          variant="action"
          className={clsx(styles.description, descriptionClassName)}
          tag="p"
        >
          {children}
        </Typography>
      </Collapse>
    </div>
  );
};
