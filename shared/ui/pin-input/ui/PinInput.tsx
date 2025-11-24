import clsx from 'clsx';
import React, {
  ClipboardEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { isNotNil } from '@/shared/lib/is-not-nil';

import { EVENT } from '../lib/constants';
import { createEmptyArray } from '../lib/create-empty-array';
import { removeValuesFromArray } from '../lib/remove-values-from-array';
import { PinInputProps, PinInputRef } from '../lib/types';
import styles from './PinInput.module.scss';

const PIN_MIN_VALUE = 0;
const PIN_MAX_VALUE = 9;
const DEFAULT_INDEX = 0;
const BACKSPACE_KEY = 'Backspace';

type Props = PinInputProps & {
  onComplete: (phone: string, sticker?: string) => void;
};

export const PinInput = forwardRef<PinInputRef, Props>(
  (
    {
      length,
      onChange,
      errorMessage,
      isValid,
      isValidating,
      className,
      pinClassNames,
      inputClassName,
      errorClassName,
      onComplete,
    },
    ref,
  ) => {
    const [pin, setPin] = useState<Array<number | undefined>>(
      createEmptyArray(length),
    );

    const validateAndSubmitPin = (currentPin: Array<number | undefined>) => {
      if (!currentPin.includes(undefined)) {
        const stringPin = currentPin.join('');
        onComplete(stringPin);
      }
    };

    useImperativeHandle(ref, () => ({
      reset: () => setPin(createEmptyArray(length)),
    }));
    const pinChange = (pinEntry: number | undefined, index: number) => {
      setPin((prevValue) => {
        const newPin = [...prevValue];
        newPin[index] = pinEntry;
        validateAndSubmitPin(newPin);
        return newPin;
      });
    };

    const pasteChange = (values: Array<number>) => {
      const newPin = Array.from({ length }, (_, index) => values[index]);
      setPin(newPin);
      if (newPin) {
        validateAndSubmitPin(newPin);
      }
    };

    const inputRefs = useRef<Array<HTMLInputElement>>([]);

    const changePinFocus = (pinIndex: number) => {
      const currentRef = inputRefs.current[pinIndex];
      if (currentRef) {
        currentRef.focus();
      }
    };

    useEffect(() => {
      changePinFocus(DEFAULT_INDEX);
    }, [isValidating]);

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number,
    ) => {
      const previousValue = event.target.defaultValue;
      let valuesArray = event.target.value.split('');
      valuesArray = removeValuesFromArray(valuesArray, previousValue);

      const value = valuesArray?.pop();
      if (!isNotNil(value)) {
        return;
      }
      const pinNumber = Number(value.trim());
      if (Number.isNaN(pinNumber) || value.length === 0) {
        return;
      }

      if (pinNumber >= PIN_MIN_VALUE && pinNumber <= PIN_MAX_VALUE) {
        pinChange(pinNumber, index);
        if (onChange) {
          const changeEvent = {
            event: EVENT.CHANGE,
            value: pinNumber,
            index,
          };
          onChange(changeEvent);
        }
        if (index < length - 1) {
          changePinFocus(index + 1);
        }
      }
    };

    const onKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      const keyboardKeyCode = event.nativeEvent.code;
      if (keyboardKeyCode !== BACKSPACE_KEY) {
        return;
      }

      if (pin[index] === undefined) {
        const prevIndex = index - 1;
        changePinFocus(prevIndex);
        pinChange(undefined, prevIndex);
        if (onChange) {
          const changeEvent = {
            event: EVENT.CHANGE,
            value: undefined,
            index: prevIndex,
          };
          onChange(changeEvent);
        }
      } else {
        pinChange(undefined, index);
        if (onChange) {
          const changeEvent = { event: EVENT.CHANGE, value: undefined, index };
          onChange(changeEvent);
        }
      }
    };

    const handlePaste: ClipboardEventHandler = (event) => {
      event.preventDefault();
      if (event?.clipboardData) {
        const pasteData = event.clipboardData.getData('text');
        const filteredData = pasteData.replace(/\D/g, '');
        const numbersArray = filteredData.split('').map(Number);
        pasteChange(numbersArray);
        if (onChange) {
          const changeEvent = { event: EVENT.PASTE, pasteData: numbersArray };
          onChange(changeEvent);
        }
      }
    };

    return (
      <div className={className}>
        <div className={clsx(styles.wrapper, pinClassNames)}>
          {Array.from({ length }, (_, index) => (
            <input
              inputMode="numeric"
              className={clsx(
                styles.input,
                { [styles.notValid]: !isValid },
                inputClassName,
              )}
              disabled={isValidating}
              onKeyDown={(event) => onKeyDown(event, index)}
              key={index}
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
              onPaste={handlePaste}
              onChange={(event) => handleChange(event, index)}
              value={isNotNil(pin[index]) ? pin[index] : ''}
            />
          ))}
        </div>
        {!isValid && errorMessage && (
          <p className={clsx(styles.error, errorClassName)}>{errorMessage}</p>
        )}
      </div>
    );
  },
);
