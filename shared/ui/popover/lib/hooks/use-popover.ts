'use client';

import {
  autoUpdate,
  flip,
  offset as floatingOffset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useMemo, useState } from 'react';

import { PopoverOptions } from '../types';

export const usePopover = ({
  offset = 14,
  initialOpen = false,
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  isHover = false,
  isClick = true,
  autoFocus = true,
  isFlip = true,
}: PopoverOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset(offset),
      ...(isFlip
        ? [
            flip({
              fallbackAxisSideDirection: 'end',
            }),
          ]
        : []),
      shift(),
    ],
  });

  const { context } = data;

  const isEnabledClick = !isClick || controlledOpen == null;

  const click = useClick(context, {
    enabled: !isHover && isEnabledClick,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);
  const hover = useHover(context, {
    enabled: isHover,
    handleClose: safePolygon(),
  });

  const interactions = useInteractions([click, dismiss, role, hover]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      disabledFocus: !autoFocus || isHover,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, setOpen, interactions, data, modal],
  );
};
