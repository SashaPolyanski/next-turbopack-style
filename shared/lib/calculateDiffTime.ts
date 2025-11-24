import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const calculateDiffTime = (
  toDate: string | Date,
  fromDate: string | Date = new Date(),
): { days: number; hours: number; minutes: number; seconds: number } => {
  if (!toDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const to = dayjs(toDate);
  const from = dayjs(fromDate);

  if (!to.isValid() || !from.isValid() || to.isBefore(from)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diffDuration = dayjs.duration(to.diff(from));

  return {
    days: Math.floor(diffDuration.asDays()),
    hours: diffDuration.hours(),
    minutes: diffDuration.minutes(),
    seconds: diffDuration.seconds(),
  };
};
