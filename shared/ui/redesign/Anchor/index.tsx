import styles from './Anchor.module.scss';

export const Anchor = ({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      className={styles.link}
      {...props}
    >
      {children}
    </a>
  );
};
