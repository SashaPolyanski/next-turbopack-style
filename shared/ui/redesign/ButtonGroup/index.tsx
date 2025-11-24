import clsx from 'clsx';

import styles from './ButtonGroup.module.scss';

type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Always keeps mobile view (100% width)
   * regardless of screen resolution
   */
  mobile?: boolean;
};

export const ButtonGroup = ({
  children,
  mobile,
  ...props
}: ButtonGroupProps) => {
  return (
    <div
      className={clsx(styles.buttonGroup, {
        [styles.static]: mobile,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
