'use client';

import { clsx } from 'clsx';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { calculateDiffTime } from '@/shared/lib/calculateDiffTime';
import { pluralize } from '@/shared/lib/pluralize';
import { Skeleton } from '@/shared/ui/redesign';

import styles from './Timer.module.scss';

type Props = {
  className?: string;
  titleVariants?: Record<'future' | 'active', string>;
  startDate: string | Date;
  onEnd?: () => void;
  isLoading?: boolean;
  delayUpdate?: number;
};

const DIVIDER = 10;
const DEFAULT_TITLE_VARIANTS = {
  future: 'Курс станет доступен через:',
  active: 'Курс уже доступен:',
};

export const Timer: React.FC<Props> = ({
  className,
  titleVariants = DEFAULT_TITLE_VARIANTS,
  startDate,
  onEnd,
  isLoading = false,
  delayUpdate = 500,
}) => {
  const date = startDate;
  const title =
    titleVariants[dayjs().isBefore(dayjs(date)) ? 'future' : 'active'];

  const [, updateState] = useState<Object>({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const { days, hours, minutes, seconds } = calculateDiffTime(date ?? '');
  const isShowSeconds = days < 1;

  useEffect(() => {
    if (date && dayjs().isBefore(dayjs(date))) {
      const intervalId = window.setInterval(() => {
        forceUpdate();
        if (date && dayjs().isAfter(dayjs(date))) {
          if (onEnd) onEnd();
          window.clearInterval(intervalId);
        }
      }, delayUpdate);
      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [date, delayUpdate, forceUpdate, onEnd]);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <>
        <div className={clsx(styles.title)}>{title}</div>
        {!date || isLoading ? (
          <Skeleton
            width={250}
            height={50}
            className={styles.skeleton}
          />
        ) : (
          <div className={styles.timer}>
            {!isShowSeconds && (
              <span>
                {Math.floor(days / DIVIDER) === 0
                  ? ''
                  : Math.floor(days / DIVIDER)}
                {days % DIVIDER} {['день', 'дня', 'дней'][pluralize(days)]}
              </span>
            )}
            {isShowSeconds && (
              <span>
                {Math.floor(hours / DIVIDER)}
                {hours % DIVIDER}:{Math.floor(minutes / DIVIDER)}
                {minutes % DIVIDER}:{Math.floor(seconds / DIVIDER)}
                {seconds % DIVIDER}
              </span>
            )}
          </div>
        )}
      </>
    </div>
  );
};
