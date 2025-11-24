import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function compareUTCDates(a?: string, b?: string): number {
  const dateA = dayjs.utc(a);
  const dateB = dayjs.utc(b);

  const isValidA = dateA.isValid();
  const isValidB = dateB.isValid();

  // обе даты невалидны — считаем равными
  if (!isValidA && !isValidB) return 0;
  // невалидная A считается "позже"
  if (!isValidA) return 1;
  // невалидная B считается "позже"
  if (!isValidB) return -1;

  return dateA.valueOf() - dateB.valueOf();
}
