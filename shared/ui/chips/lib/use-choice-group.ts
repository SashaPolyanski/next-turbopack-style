type GetKey<ITEM> = (item: ITEM) => string | number;

type GetOnChange<ITEM, EVENT> = (item: ITEM) => (e: EVENT) => void;

type GetChecked<ITEM> = (item: ITEM) => boolean;

type UseChoiceGroupValues<ITEM, EVENT> = {
  getOnChange: GetOnChange<ITEM, EVENT>;
  getChecked: GetChecked<ITEM>;
};

export type CallbackWithMultiple<ITEM, EVENT> = (
  value: Array<ITEM> | null,
  props: {
    e: EVENT;
    selectedItem: ITEM;
  },
) => void;

export type CallbackWithoutMultiple<ITEM, EVENT> = (
  value: ITEM,
  props: {
    e: EVENT;
    selectedItem: ITEM;
  },
) => void;

type PropsWithMultiple<ITEM, EVENT> = {
  multiple: true;
  value: Array<ITEM> | null;
  callBack?: CallbackWithMultiple<ITEM, EVENT>;
};

type PropsWithoutMultiple<ITEM, EVENT> = {
  multiple: false;
  value: ITEM | null;
  callBack?: CallbackWithoutMultiple<ITEM, EVENT>;
};

type CommonProps<ITEM> = {
  getKey: GetKey<ITEM>;
};

type UseChoiceGroupProps<ITEM, EVENT> = CommonProps<ITEM> &
  (PropsWithMultiple<ITEM, EVENT> | PropsWithoutMultiple<ITEM, EVENT>);

type FormatedItems<ITEM> = { [value: string]: ITEM };

function isMultiple<ITEM, EVENT>(
  params: UseChoiceGroupProps<ITEM, EVENT>,
): params is CommonProps<ITEM> & PropsWithMultiple<ITEM, EVENT> {
  return params.multiple;
}

function isNotMultiple<ITEM, EVENT>(
  params: UseChoiceGroupProps<ITEM, EVENT>,
): params is CommonProps<ITEM> & PropsWithoutMultiple<ITEM, EVENT> {
  return !params.multiple;
}

const isNotNil = <T>(value: T): value is Exclude<T, undefined | null> =>
  value !== undefined && value !== null;

function formatValue<ITEM>(
  valueProp: ITEM | Array<ITEM> | null,
  getKey: GetKey<ITEM>,
  multiple?: boolean,
) {
  const valueByKey: FormatedItems<ITEM> = {};
  if (!isNotNil(valueProp) && !Array.isArray(valueProp)) {
    return valueByKey;
  }
  const value = multiple ? (valueProp as Array<ITEM>) : [valueProp as ITEM];
  if (value && value.length > 0) {
    value.forEach((item) => {
      valueByKey[getKey(item)] = item;
    });
  }
  return valueByKey;
}

export function useChoiceGroup<ITEM, EVENT>(
  props: UseChoiceGroupProps<ITEM, EVENT>,
): UseChoiceGroupValues<ITEM, EVENT> {
  const formatedValue = formatValue(props.value, props.getKey, props.multiple);

  const getChecked: GetChecked<ITEM> = (item) =>
    Object.prototype.hasOwnProperty.call(formatedValue, props.getKey(item));

  const getOnChange: GetOnChange<ITEM, EVENT> = (selectedItem) => (e) => {
    if (isMultiple(props)) {
      let newValue: Array<ITEM> | null;

      if (getChecked(selectedItem)) {
        const value = props.value || [];
        newValue = value.filter(
          (item) => props.getKey(item) !== props.getKey(selectedItem),
        );
        if (newValue.length === 0) {
          newValue = null;
        }
      } else {
        newValue = props.value ? [...props.value] : [];
        newValue.push(selectedItem);
      }
      props.callBack?.(newValue, { e, selectedItem });
    }

    if (isNotMultiple(props)) {
      props.callBack?.(selectedItem, { e, selectedItem });
    }
  };

  return {
    getOnChange,
    getChecked,
  };
}
