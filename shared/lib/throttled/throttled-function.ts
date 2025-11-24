// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThrottledFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;
