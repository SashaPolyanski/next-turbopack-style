import clsx, { ClassValue } from 'clsx';

import { twMergeCustom } from './config';

export const cn = (...inputs: Array<ClassValue>) => {
  return twMergeCustom(clsx(inputs));
};
