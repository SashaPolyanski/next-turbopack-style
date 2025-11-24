import React, { FC, SVGProps } from 'react';

import { AnimateIconBaseSize } from '@/shared/ui/animate-icon-base';

import {
  PropsWithHtmlAttributes,
  PropsWithHTMLAttributesAndRef,
} from '../../lib/types/props-with-html-attributes';

const collapsePropIconPosition = ['right'] as const;
export const collapsePropIconPositionDefault = collapsePropIconPosition[0];

const collapseIconPropDirection = [
  'up',
  'right',
  'down',
  'left',
  'upRight',
  'downRight',
  'upLeft',
  'downLeft',
] as const;
export type CollapseIconPropDirection =
  (typeof collapseIconPropDirection)[number];

export type CollapseIconProps = PropsWithHtmlAttributes<
  {
    size: AnimateIconBaseSize;
    icon: FC<SVGProps<SVGElement>>;
    isOpen?: boolean;
    cildren?: never;
    closeIcon?: FC<SVGProps<SVGElement>>;
    direction?: CollapseIconPropDirection;
    closeDirection?: CollapseIconPropDirection;
  },
  HTMLSpanElement
>;

const collapsePropDirectionIcon = collapseIconPropDirection;
export const collapsePropDirectionIconDefault = collapsePropDirectionIcon[0];
export const collapsePropCloseDirectionIconDefault =
  collapsePropDirectionIcon[2];

export type CollapseProps = PropsWithHTMLAttributesAndRef<
  {
    iconClassName?: string;
    labelClassName?: string;
    icon?: FC<SVGProps<SVGElement>>;
    divider?: boolean;
    label: React.ReactNode;
    maxContentHeight?: string | number;
    isOpen?: boolean;
    rightSide?: React.ReactNode;
    iconPosition?: 'right' | 'left';
  } & (
    | {
        closeIcon?: FC<SVGProps<SVGElement>>;
        directionIcon?: never;
        closeDirectionIcon?: never;
      }
    | {
        closeIcon?: never;
        directionIcon?: CollapseIconPropDirection;
        closeDirectionIcon?: CollapseIconPropDirection;
      }
  ),
  HTMLDivElement
>;
