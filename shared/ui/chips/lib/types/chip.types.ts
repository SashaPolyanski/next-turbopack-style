import { ReactElement } from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../../../lib/types/props-with-html-attributes';
import type { ChipsVariants } from '../../ui/chips';
import {
  ChipsDefaultItem,
  ChipsPropGetItemActive,
  ChipsPropGetItemLabel,
  ChipsPropOnItemClick,
} from './types';

export type ChipsProps<ITEM = ChipsDefaultItem> = PropsWithHTMLAttributesAndRef<
  {
    items: Array<ITEM>;
    getItemActive?: ChipsPropGetItemActive<ITEM>;
    getItemLabel?: ChipsPropGetItemLabel<ITEM>;
    onItemClick?: ChipsPropOnItemClick<ITEM>;
    className?: string;
    chipClassName?: string;
  } & ChipsVariants,
  HTMLDivElement
> &
  (ITEM extends { label: string }
    ? {}
    : {
        getItemLabel: ChipsPropGetItemLabel<ITEM>;
      });

export type ChipsComponent = <ITEM = ChipsDefaultItem>(
  props: ChipsProps<ITEM>,
) => ReactElement | null;
