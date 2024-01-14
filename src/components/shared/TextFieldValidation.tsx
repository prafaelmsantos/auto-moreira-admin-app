import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  SxProps,
  TextField,
  Theme
} from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type ITextFieldValidation = {
  register: UseFormRegisterReturn<string>;
  error: boolean;
  helperText?: string;
  inputProps?: FilledInputProps | OutlinedInputProps | InputProps;
  defaultValue?: string | number;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  sx?: SxProps<Theme>;
};
export default function TextFieldValidation(props: ITextFieldValidation) {
  const {
    register,
    error,
    helperText,
    inputProps,
    defaultValue,
    label,
    type,
    sx
  } = props;
  return (
    <TextField
      required
      id={register.name}
      label={label}
      fullWidth
      margin="dense"
      {...register}
      error={error}
      helperText={helperText}
      InputProps={inputProps}
      type={type}
      defaultValue={defaultValue}
      sx={sx}
    />
  );
}
