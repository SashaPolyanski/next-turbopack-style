import { MILLISEC_IN_SEC } from '@/shared/lib/constants/timers';

export const getTimeDuration = (start: string, end: string) => {
  const timeEnd = new Date(end).getTime();
  const timeStart = new Date(start).getTime();
  return timeStart && timeEnd
    ? ((timeEnd - timeStart) / MILLISEC_IN_SEC)?.toString()
    : undefined;
};
