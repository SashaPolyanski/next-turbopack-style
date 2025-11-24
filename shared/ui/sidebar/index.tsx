import {
  useFloating,
  useMergeRefs,
  useTransitionStatus,
} from '@floating-ui/react';
import clsx from 'clsx';
import React, { JSX, useEffect, useRef } from 'react';
import { useScrollLock } from 'usehooks-ts';

import { useGlobalKeys } from '../../lib/hooks/use-global-keys';
import { PropsWithHtmlAttributes } from '../../lib/types/props-with-html-attributes';
import { AnimationButtonCross } from '../animation-button-cross';
import { Portal } from '../portal';
import styles from './Sidebar.module.scss';

const sidebarPropPosition = ['right'] as const;
type SidebarPropPosition = (typeof sidebarPropPosition)[number];

const sidebarPropSize = ['l', 'full'] as const;

export type SidebarPropSize = (typeof sidebarPropSize)[number];

type SidebarProps = PropsWithHtmlAttributes<
  {
    isOpen?: boolean;
    hasOverlay?: boolean;
    onClickOutside?: () => void;
    onEsc?: (event: KeyboardEvent) => void;
    position?: SidebarPropPosition;
    size?: SidebarPropSize;
    rootClassName?: string;
    children?: React.ReactNode;
    widthReflow?: boolean;
  },
  HTMLDivElement
>;

type SidebarContentProps = {
  className?: string;
  children: React.ReactNode;
};

type SidebarHeaderProps = {
  className?: string;
  title: string;
  onClose: () => void;
};

type SidebarActionsProps = {
  className?: string;
  children: React.ReactNode;
};

const SidebarHeader = ({
  className,
  title,
  onClose,
  ...rest
}: SidebarHeaderProps) => (
  <div
    className={clsx(styles.header, className)}
    {...rest}
  >
    <div className={styles.title}>{title}</div>
    <AnimationButtonCross
      onClick={onClose}
      className={styles.cross}
    />
  </div>
);

const SidebarContent = ({
  className,
  children,
  ...rest
}: SidebarContentProps) => (
  <div
    className={clsx(styles.content, className)}
    {...rest}
  >
    {children}
  </div>
);

const SidebarFooter = ({
  className,
  children,
  ...rest
}: SidebarActionsProps) => (
  <div
    className={clsx(styles.actions, 'pt-3', className)}
    {...rest}
  >
    {children}
  </div>
);

type AsTags = keyof JSX.IntrinsicElements;
type AsTagAttribute<T extends AsTags> = JSX.IntrinsicElements[T];

interface SidebarComponent
  extends React.FC<SidebarProps>,
    AsTagAttribute<'div'> {
  Content: typeof SidebarContent;
  Footer: typeof SidebarFooter;
  Header: typeof SidebarHeader;
}

export const Sidebar: SidebarComponent = (props) => {
  const {
    isOpen = false,
    hasOverlay = true,
    onClickOutside,
    onEsc,
    position = sidebarPropPosition,
    size = 'l',
    className,
    children,
    style,
    rootClassName,
    widthReflow = false,
    ...otherProps
  } = props;

  useGlobalKeys({
    Escape: (e) => isOpen && onEsc && onEsc(e),
  });

  const { refs, context } = useFloating({
    open: isOpen,
  });

  const { isMounted, status } = useTransitionStatus(context, { duration: 240 });

  const contentRef = useRef<HTMLDivElement | null>(null);
  const floatingRef = useMergeRefs([refs.setFloating, contentRef]);

  const handleClickOutside = () => {
    if (onClickOutside) {
      onClickOutside();
    }
  };
  const { lock, unlock } = useScrollLock({
    autoLock: false,
    widthReflow,
  });

  useEffect(() => {
    if (isMounted) {
      lock();
    } else {
      unlock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <Portal propIdNameElement="sidebar">
      <div
        className={clsx(
          styles.sidebar,
          styles[`sidebar_position_${position}`],
          { [styles.hasOverlay]: hasOverlay },
          rootClassName,
          'z-sidebar',
        )}
        style={
          typeof style?.zIndex === 'number'
            ? { zIndex: style.zIndex }
            : undefined
        }
      >
        {hasOverlay && (
          <div
            data-status={status}
            className={styles.overlay}
            aria-label="Overlay"
            onKeyDown={handleClickOutside}
            onClick={handleClickOutside}
          />
        )}
        <div
          data-status={status}
          {...otherProps}
          style={{
            ...style,
            zIndex: undefined,
          }}
          className={clsx(
            styles.window,
            styles[`window_position_${position}`],
            styles[`window_size_${size}`],
            className,
            'p-4 sm:p-8',
          )}
          ref={floatingRef}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;
