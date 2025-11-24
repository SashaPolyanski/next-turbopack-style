import { ThrottledFunction } from './throttled-function';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: Array<any>) => any>(
  func: T,
  limit: number,
): ThrottledFunction<T> {
  let inThrottle = false;
  let lastResult: ReturnType<T>;

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const context = this;

    if (!inThrottle) {
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);

      lastResult = func.apply(context, args);
    }

    return lastResult;
  };
}
