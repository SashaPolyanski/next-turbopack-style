'use client';

import { clsx } from 'clsx';

import { SunFrontIcon } from '../../svg';
import styles from './Loader.module.scss';

type LoaderProps = {
  withRounded?: boolean;
};

export function Loader({ withRounded = false }: LoaderProps) {
  return (
    <>
      <div className={clsx(styles.overlay, withRounded && styles.rounded)} />
      <div className={styles.loader}>
        <SunFrontIcon alt="" />
      </div>
    </>
  );
}
