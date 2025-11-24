'use client';

import {
  FloatingFocusManager,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react';
import React, {
  cloneElement,
  forwardRef,
  HTMLProps,
  isValidElement,
  ReactNode,
  Ref,
  useImperativeHandle,
} from 'react';

import { useAppContext } from '../../../lib/hooks/useAppContext';
import { Portal } from '../../portal';
import { PopoverContext } from '../lib/context/popover';
import { usePopover } from '../lib/hooks/use-popover';
import { ApiRef, PopoverOptions } from '../lib/types';

export const Popover = ({
  children,
  modal = false,
  isHover = false,
  isClick = true,
  ...restOptions
}: {
  children: ReactNode;
} & PopoverOptions) => {
  const popover = usePopover({ isHover, modal, isClick, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
};

interface PopoverTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & PopoverTriggerProps
>(({ children, asChild = false, ...props }, propRef) => {
  const context = useAppContext(PopoverContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(children.props || {}),
      }),
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

export const PopoverContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & { apiRef?: Ref<ApiRef> }
>(({ style, apiRef, ...props }, propRef) => {
  const { context: floatingContext, ...context } =
    useAppContext(PopoverContext);
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  const { isMounted, styles: stylesTransition } = useTransitionStyles(
    floatingContext,
    {
      duration: 100,
    },
  );

  useImperativeHandle(apiRef, () => ({
    close: () => floatingContext.onOpenChange(false),
  }));

  return (
    isMounted && (
      <Portal propIdNameElement="popover">
        <FloatingFocusManager
          context={floatingContext}
          modal={context.modal}
          disabled={context.disabledFocus}
        >
          <div
            ref={ref}
            style={{
              ...context.floatingStyles,
              ...stylesTransition,
              ...style,
              zIndex: 'var(--z-index-popover)',
            }}
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      </Portal>
    )
  );
});

export const PopoverClose = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ asChild, children, ...props }, ref) => {
  const context = useAppContext(PopoverContext);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(children.props || {}),
      }),
    );
  }

  return (
    <button
      type="button"
      ref={ref}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        context.setOpen(false);
      }}
    />
  );
});
