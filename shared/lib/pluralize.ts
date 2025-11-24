const pluralizeRU = (num: number): 0 | 1 | 2 => {
  if (num === 1) return 0;
  const n = Math.abs(num) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return 2;
  if (n1 > 1 && n1 < 5) return 1;
  if (n1 === 1) return 0;
  return 2;
};
const pluralizeEn = (num: number): 0 | 1 => {
  if (num === 1) return 0;
  return 1;
};

export const pluralize = (
  number: number,
  locale: 'en' | 'ru' = 'ru',
): number => {
  switch (locale) {
    case 'ru':
      return pluralizeRU(number);
    default:
      return pluralizeEn(number);
  }
};
