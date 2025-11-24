import { ReactNode } from 'react';

import styles from './styles.module.scss';

type FloatingContainerProps = {
  children: ReactNode;
};

/**
 * Creates container, that act normally on desktop, but fixing children
 * to screen bottom on mobile
 */
export const FloatingContainer = ({ children }: FloatingContainerProps) => (
  <div className={styles.fixed}>{children}</div>
);
