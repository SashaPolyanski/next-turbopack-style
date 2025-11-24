import { forwardRef, Ref } from 'react';

import { defaultGetItemLabel } from '../lib/helpers';
import {
  ChipsChoiceComponent,
  ChipsChoiceDefaultItem,
  ChipsChoicePropGetItemKey,
  ChipsChoiceProps,
} from '../lib/types/chips-choice.type';
import { useChoiceGroup } from '../lib/use-choice-group';
import { Chips } from './chips';

const getItemKeyDefault: ChipsChoicePropGetItemKey<ChipsChoiceDefaultItem> = (
  item,
) => item.key;

const ChipsChoiceRender = (
  props: ChipsChoiceProps,
  ref: Ref<HTMLDivElement>,
) => {
  const {
    value,
    onChange,
    multiple,
    getItemKey = getItemKeyDefault,
    getItemLabel = defaultGetItemLabel,
    ...otherProps
  } = props;
  const { getOnChange, getChecked } = useChoiceGroup<
    ChipsChoiceDefaultItem,
    MouseEvent
  >({
    getKey: (item: ChipsChoiceDefaultItem) => {
      const key = getItemKey(item);
      return typeof key !== undefined && key ? key : getItemLabel(item);
    },
    value: value as ChipsChoiceDefaultItem,
    callBack: onChange,
    multiple: multiple as false,
  });

  return (
    <Chips
      {...otherProps}
      ref={ref}
      onItemClick={(item, { e }) => getOnChange(item)(e)}
      getItemActive={getChecked}
      getItemLabel={getItemLabel}
    />
  );
};

export const ChipsChoice = forwardRef(
  ChipsChoiceRender,
) as ChipsChoiceComponent;
