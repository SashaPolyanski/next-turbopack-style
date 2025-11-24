import { ReactElement } from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../../../lib/types/props-with-html-attributes';
import { ChipsVariants } from '../../ui/chips';
import { ChipsDefaultItem, ChipsPropGetItemLabel } from './types';

export type ChipsChoiceDefaultItem = ChipsDefaultItem & {
  key: string;
};

export type ChipsChoicePropGetItemKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;

export type ChipsChoicePropOnChange<ITEM, MULTIPLE extends boolean> = (
  value: MULTIPLE extends true ? Array<ITEM> | null : ITEM,
  props: {
    e: MouseEvent;
    selectedItem: ITEM;
  },
) => void;

export type ChipsChoicePropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? Array<ITEM> : ITEM)
  | null;

export type ChipsChoiceProps<
  ITEM = ChipsChoiceDefaultItem,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    items: Array<ITEM>;
    getItemLabel?: ChipsPropGetItemLabel<ITEM>;
    onChange: ChipsChoicePropOnChange<ITEM, MULTIPLE>;
    multiple?: MULTIPLE;
    value?: ChipsChoicePropValue<ITEM, MULTIPLE>;
    getItemKey?: ChipsChoicePropGetItemKey<ITEM>;
    chipClassName?: string;
  } & ChipsVariants,
  HTMLDivElement
> &
  (ITEM extends { label: string }
    ? {}
    : {
        getItemLabel?: ChipsPropGetItemLabel<ITEM>;
      });

export type ChipsChoiceComponent = <
  ITEM = ChipsChoiceDefaultItem,
  MULTIPLE extends boolean = false,
>(
  props: ChipsChoiceProps<ITEM, MULTIPLE>,
) => ReactElement | null;
