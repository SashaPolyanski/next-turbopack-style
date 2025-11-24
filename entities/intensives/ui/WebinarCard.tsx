'use client';

import { clsx } from 'clsx';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useCallback, useEffect, useState } from 'react';

import { CourseProgramCard } from '@/entities/course-program-card';
import { useAnalytics } from '@/shared/lib/hooks/use-analytics';
import { useMedia } from '@/shared/lib/hooks/use-media';
import { BadgeGroupsItem } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/redesign';
import {
  IconComplete,
  IconLock,
  IconUnlock,
  IconWarningCircle,
} from '@/shared/ui/svg';

import { Webinar } from '../model';
import styles from './WebinarCard.module.scss';

dayjs.extend(duration);
dayjs.extend(isBetween);

type IntensiveCardProps = {
  webinar: Webinar;
  intensive: {
    uid: string;
    date_start: string;
    title: string;
  };
  webinarNumber: number;
  isSubscribed: boolean;
};

type Status = 'locked' | 'prepare' | 'progress' | 'completed';
const TRESHOLD_FOR_WARNING = 15;
const UPDATE_INTERVAL = 1000;

export const WebinarCard = ({
  webinar,
  intensive,
  webinarNumber,
  isSubscribed = false,
}: IntensiveCardProps) => {
  const {
    uid,
    theme: { description, title },
    address,
    time_start_UTC: startAt,
    time_end_UTC: endAt,
  } = webinar;

  const getEventStatus = (timeStart?: string, timeEnd?: string) => {
    if (!timeStart || !timeEnd || !isSubscribed) return 'locked';
    const now = dayjs();
    const startDate = dayjs(timeStart);
    const endDate = dayjs(timeEnd);
    const prepareThreshold = startDate.subtract(TRESHOLD_FOR_WARNING, 'minute');

    if (endDate.isBefore(now)) return 'completed';
    if (now.isBetween(startDate, endDate, null, '[]')) return 'progress';
    if (now.isAfter(prepareThreshold)) return 'prepare';
    return 'locked';
  };

  const [status, setStatus] = useState<Status>(getEventStatus(startAt, endAt));
  const [, updateState] = useState<Object>({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const { track, ref } = useAnalytics({
    sendAfterVisible: true,
    type: 'Intensive_Webinar',
    params: {
      is_join: isSubscribed.toString(),
      webinar_name: title,
      webinar_dt: startAt,
      webinar_id: uid,
      status:
        status === 'progress' || status === 'prepare' ? 'unlocked' : 'locked',
      is_done: (status === 'completed').toString(),
      intensive_name: intensive.title,
      intensive_dt: intensive.date_start,
      intensive_id: intensive.uid,
    },
  });

  const handleOpenWebinar = () => {
    track('Intensive_Webinar', {
      action: 'click',
      params: {
        webinar_name: webinar.theme.title,
        webinar_dt: webinar.time_start_UTC,
        webinar_id: webinar.uid,
        intensive_name: intensive.title,
        intensive_dt: intensive.date_start,
        intensive_id: intensive.uid,
      },
    });
    window.open(address, '_blank');
  };

  const { isDesktop } = useMedia();

  const formatWebinarDate = (isoDate?: string) => {
    if (!isoDate) return '';
    return dayjs(isoDate).format('DD MMMM [в] HH:mm');
  };
  useEffect(() => {
    const id = setInterval(() => {
      const currentStatus = getEventStatus(startAt, endAt);
      if (status === currentStatus) return;
      setStatus(currentStatus);
      forceUpdate();
    }, UPDATE_INTERVAL);

    return () => clearInterval(id);
  }, [endAt, startAt]);

  const getBadgeItems = () => {
    const badges: Array<BadgeGroupsItem> = [];

    const getBadgeIcon = (stat: Status) => {
      if (!isSubscribed) return IconLock;
      switch (stat) {
        case 'completed':
          return IconComplete;
        default:
          return IconUnlock;
      }
    };
    const getBadgeVariant = (stat: Status) => {
      switch (stat) {
        case 'completed':
          return 'complete';
        default:
          return undefined;
      }
    };

    badges.push({
      label: `${webinarNumber} модуль`,
      color: 'secondary',
      iconLeft: getBadgeIcon(status),
      variant: getBadgeVariant(status),
    });

    if (startAt) {
      badges.push(
        { label: formatWebinarDate(startAt), color: 'secondary' },
        {
          label: 'По вашему местному времени',
          color: 'secondary',
          variant: 'clear',
        },
      );
    }

    return badges;
  };

  const renderRight = () => {
    if (!isSubscribed) return null;
    if (status === 'locked')
      return (
        <div className={styles.lockedAttention}>
          <IconWarningCircle />
          <span>
            Ссылка появится за {TRESHOLD_FOR_WARNING} мин{' '}
            {isDesktop ? 'до начала' : ''}
          </span>
        </div>
      );
    if (status === 'prepare' || status === 'progress')
      return (
        <Button
          theme="white"
          size="m"
          className={styles.button}
          onClick={handleOpenWebinar}
        >
          Подключиться
        </Button>
      );
    return null;
  };

  return (
    <div ref={ref}>
      <CourseProgramCard
        className={clsx(styles.card, isSubscribed && styles.alignCenter)}
        items={getBadgeItems()}
        description={description}
        title={title}
        renderRight={renderRight}
      />
    </div>
  );
};
