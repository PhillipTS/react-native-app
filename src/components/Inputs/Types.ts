import { Style } from '../../../lib/Types';

/** Types related to Inputs */

export interface BaseInputProps {
  children?: React.ReactNode;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  iconName?: string;
  style?: Style;
  inputStyle?: Style;
}

export interface TextInputProps extends BaseInputProps {
  type?: 'email' | 'password' | 'phone';
  lines?: number;
  baseInputStyle?: Style;
}

export interface SelectInputProps extends BaseInputProps {
  options: string[];
}

export interface SelectInputState {
  modalOpen: boolean;
}

export interface DigitInputProps extends BaseInputProps {}

export interface SwitchInputProps {
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

export interface PhoneNumberInputProps extends BaseInputProps {
  onChangeCountryCode: (value: string) => void;
}
