import { useCallback, useRef, useState } from 'react';

export type TimerReturn = {
  startTimer: Function;
  stopTimer?: Function;
  seconds: number;
  clearTimer: Function;
};

const DELAY = 1000;

export const useTimer = (): TimerReturn => {
  const [seconds, setSeconds] = useState<number>(0);
  const timerId = useRef<ReturnType<typeof setInterval>>(null);

  const startTimer = useCallback(() => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, DELAY);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }
  }, []);

  const clearTimer = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    setSeconds(0);
  }, []);

  return {
    startTimer,
    stopTimer,
    clearTimer,
    seconds,
  };
};
