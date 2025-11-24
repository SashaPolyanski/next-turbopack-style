import { clsx } from 'clsx';

import { Badge, BadgeProps } from './Badge';
import styles from './BadgeGroups.module.scss';

export type BadgeGroupsItem = {
  label: string;
} & Omit<BadgeProps, 'className'>;

type BadgeGroupsEmpty = 's' | 'm';

type BadgeGroupsProps = {
  items: Array<BadgeGroupsItem>;
  empty?: BadgeGroupsEmpty;
  rootClassName?: string;
  className?: string;
} & Pick<BadgeProps, 'size'>;

export const BadgeGroups = ({
  items,
  empty = 'm',
  rootClassName,
  className,
  ...props
}: BadgeGroupsProps) => {
  return (
    <div
      className={clsx(styles.wrapper, styles[`empty_${empty}`], rootClassName)}
    >
      {items.map(({ label, ...badgeProps }) => (
        <Badge
          key={label}
          className={className}
          {...badgeProps}
          {...props}
        >
          {label}
        </Badge>
      ))}
    </div>
  );
};
