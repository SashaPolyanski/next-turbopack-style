import { ChipsProps } from './types/chip.types';
import {
  ChipsDefaultItem,
  ChipsPropGetItemActive,
  ChipsPropGetItemLabel,
} from './types/types';

const defaultGetItemActive: ChipsPropGetItemActive<ChipsDefaultItem> = (item) =>
  item.isActive;

export const defaultGetItemLabel: ChipsPropGetItemLabel<ChipsDefaultItem> = (
  item,
) => item.label;

export function withDefaultGetters<ITEM>(props: ChipsProps<ITEM>) {
  return {
    ...props,
    getItemActive: props.getItemActive || defaultGetItemActive,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
  };
}
