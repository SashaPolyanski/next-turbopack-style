import { clsx } from 'clsx';
import { ChangeEvent, MouseEvent } from 'react';

import styles from './RadioButton.module.scss';

interface IRadioButton {
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  loading?: boolean;
  name?: string;
  id?: string;
  label?: string;
  right?: boolean;
  wrong?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function RadioButton({
  className,
  disabled,
  checked,
  loading,
  name,
  id,
  label,
  right,
  wrong,
  onClick,
  onChange,
  ref,
}: IRadioButton) {
  const isReadOnly = typeof onChange !== undefined;
  return (
    <label className={clsx(styles.radioButton, className)}>
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <input
            readOnly={isReadOnly}
            disabled={disabled}
            type="radio"
            name={name}
            className={clsx(styles.radioInput, {
              [styles.right]: right && !loading && checked,
              [styles.wrong]: wrong && !loading && checked,
              [styles.inactive]: (right || wrong) && !loading && !checked,
              [styles.groupHover]: !disabled,
            })}
            id={id}
            checked={checked}
            onChange={onChange}
            onClick={onClick}
            ref={ref}
          />
          <div
            className={clsx(styles.radioMark, {
              [styles.checked]: !loading && checked,
              [styles.right]: right && !loading && checked,
              [styles.wrong]: wrong && !loading && checked,
              [styles.groupHover]: !disabled,
            })}
          />
        </div>
      </div>
      {!!label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
