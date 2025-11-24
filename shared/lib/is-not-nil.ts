export const isNotNil = <T>(value: T): value is Exclude<T, undefined | null> =>
  value !== undefined && value !== null;
