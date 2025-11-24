import { clsx } from 'clsx';
import React, { ChangeEventHandler } from 'react';

import { useForkRef } from '../../../lib/hooks/use-fork-ref';
import { PropsWithHtmlAttributes } from '../../../lib/types/props-with-html-attributes';
import styles from './checkbox.module.scss';

const checkboxPropAlign = ['top', 'center'] as const;
export type CheckboxPropAlign = (typeof checkboxPropAlign)[number];
const checkboxPropAlignDefault: CheckboxPropAlign = checkboxPropAlign[0];

const checkboxPropOnChangeDefault = () => {};

type Props = {
  checked: boolean | undefined;
  align?: CheckboxPropAlign;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLInputElement>;
  children?: never;
  for?: string;
  inputId?: string;
  isError?: boolean;
  size?: 's';
};

export type CheckboxProps = PropsWithHtmlAttributes<Props, HTMLLabelElement>;

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (props, ref) => {
    const checkboxRef = React.useRef<HTMLLabelElement>(null);

    const {
      checked = false,
      name,
      size = 's',
      align = checkboxPropAlignDefault,
      disabled,
      className,
      label,
      onChange = checkboxPropOnChangeDefault,
      onFocus,
      onBlur,
      readOnly,
      required,
      tabIndex,
      inputId,
      inputRef,
      isError,
      ...otherProps
    } = props;

    return (
      <label
        {...otherProps}
        className={clsx(styles.checkbox, styles[`align-${align}`], className)}
        ref={useForkRef([ref, checkboxRef])}
      >
        <input
          className={clsx(styles.input, styles[`size_${size}`], {
            [styles.inputError]: isError,
          })}
          type="checkbox"
          name={name}
          checked={checked}
          id={inputId}
          disabled={disabled}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          required={required}
          tabIndex={tabIndex}
          ref={inputRef}
        />
        {label && (
          <span className={clsx(styles.label, styles[`labelSize_${size}`])}>
            {label}
          </span>
        )}
      </label>
    );
  },
);
