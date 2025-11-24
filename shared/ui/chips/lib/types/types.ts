export type ChipsDefaultItem = {
  label: string;
  value: string;
  isActive?: boolean;
};

export type ChipsPropGetItemLabel<ITEM> = (
  item: ITEM,
) => ChipsDefaultItem['label'];

export type ChipsPropOnItemClick<ITEM> = (
  item: ITEM,
  props: { e: MouseEvent },
) => void;

export type ChipsPropGetItemActive<ITEM> = (
  item: ITEM,
) => ChipsDefaultItem['isActive'];
