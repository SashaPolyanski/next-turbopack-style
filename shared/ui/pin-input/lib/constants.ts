export const EVENT = {
  CHANGE: 'change',
  PASTE: 'paste',
};

export type Event = (typeof EVENT)[keyof typeof EVENT];
