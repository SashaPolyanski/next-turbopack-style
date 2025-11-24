import { Event } from './constants';

type ChangePin = ({
  event,
  value,
  index,
}: {
  event: Event;
  value?: number;
  index?: number | undefined;
  pasteData?: Array<number>;
}) => void;

export interface PinInputProps {
  onChange?: ChangePin;
  length: number;
  errorMessage?: string;
  isValid: boolean | undefined;
  isValidating?: boolean;
  className?: string;
  pinClassNames?: string;
  inputClassName?: string;
  errorClassName?: string;
  onComplete: (value: string) => void;
}

export interface PinInputRef {
  reset: () => void;
}
