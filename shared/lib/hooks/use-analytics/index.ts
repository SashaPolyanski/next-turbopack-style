'use client';

import { usePathname } from 'next/navigation';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

// eslint-disable-next-line boundaries/element-types
// eslint-disable-next-line boundaries/element-types
import { useIsVisibleOnce } from '../useIsVisible';
import { ACTION, Action } from './lib/get-action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Params = Record<string, any>;

export type TrackType = string;
export type TrackOptions = {
  withDefaultPrefix?: boolean;
  params?: Params;
  action?: Action;
  withActionPrefix?: boolean;
};

export type Track = (type: TrackType, options?: TrackOptions) => void;

export type DefaultParams = {
  idUser: string;
  country?: string;
  path: string;
};

export type UseAnalyticsReturn = {
  track: Track;
  defaultParams: DefaultParams;
  ref: MutableRefObject<HTMLDivElement | null>;
};

export type UseAnalyticsParams = {
  type: string;
  params: Params;
  sendAfterVisible: boolean;
  sendOnFirstVisitOnly: boolean;
  skip: boolean;
};

const DEFAULT_PREFIX = 'Supplier_Prowb_';

export const useAnalytics = (
  props: Partial<UseAnalyticsParams> = {},
): UseAnalyticsReturn => {
  const {
    params: propParams = {},
    sendAfterVisible = false,
    type: propType,
    sendOnFirstVisitOnly = false,
    skip = false,
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const userId: any = '';
  const location: any = '';
  const isVisible = useIsVisibleOnce(ref, true);
  const isFirstSentAnalytics = useRef(true);

  const defaultParams = useMemo(
    () => ({
      idUser: userId,
      country: location?.code?.toLowerCase(),
      path: pathname,
    }),
    [location?.code, pathname, userId],
  );

  const track: Track = useCallback(
    (type, options = { withDefaultPrefix: true, params: {} }) => {
      const {
        withDefaultPrefix = true,
        params,
        action,
        withActionPrefix = true,
      } = options;

      let currentType = type;
      if (withDefaultPrefix) {
        currentType = DEFAULT_PREFIX + type;
      }

      currentType += action
        ? `${withActionPrefix ? '_' : ''}${ACTION[action]}`
        : '';

      if (process.env.isShowAnalyticsLog === 'true') {
        console.warn(currentType, {
          ...defaultParams,
          ...params,
        });
      }

      try {
        window.wba(currentType, {
          ...defaultParams,
          ...params,
        });
      } catch (e) {
        console.warn(`Ошибка подключения аналитики wba: ${e}`);
      }
    },
    [defaultParams],
  );

  const viewAnalitics = useCallback(() => {
    track(propType || '', {
      params: propParams,
      withActionPrefix: Boolean(propType),
      action: 'view',
    });
  }, [propType, propParams, track]);

  useEffect(() => {
    if (sendAfterVisible && isVisible && propType && !skip) {
      viewAnalitics();
    }
  }, [
    isVisible,
    sendAfterVisible,
    sendOnFirstVisitOnly,
    propType,
    skip,
    viewAnalitics,
  ]);

  useEffect(() => {
    if (sendOnFirstVisitOnly && !skip && isFirstSentAnalytics.current) {
      viewAnalitics();
      isFirstSentAnalytics.current = false;
    }
  }, [sendOnFirstVisitOnly, viewAnalitics, propParams, skip]);

  return { track, defaultParams, ref };
};
