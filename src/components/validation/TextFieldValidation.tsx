import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  TextField
} from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';

type ITextFieldValidation = {
  register: UseFormRegisterReturn<string>;
  error: boolean;
  helperText?: string;
  defaultValue?: string | number;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
};
export default function TextFieldValidation(props: ITextFieldValidation) {
  const {
    register,
    error,
    helperText,
    defaultValue,
    label,
    type,
    required = true
  } = props;
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const redColor = '#d32f2f';

  return (
    <TextField
      required={required}
      id={register.name}
      label={label}
      fullWidth
      margin="dense"
      {...register}
      error={error}
      helperText={helperText}
      type={type}
      defaultValue={defaultValue}
      InputProps={{
        style: {
          color: error
            ? redColor
            : darkMode
            ? 'white'
            : COLORS.AUTO_MOREIRA_NAVY[700]
        }
      }}
      sx={{
        '& .MuiInputBase-input.Mui-disabled': {
          //WebkitTextFillColor: '#422AFB',
          color: error
            ? redColor
            : darkMode
            ? 'white'
            : COLORS.AUTO_MOREIRA_NAVY[700]
        },
        '& label.MuiInputLabel-root': {
          color: error
            ? redColor
            : darkMode
            ? 'white'
            : COLORS.AUTO_MOREIRA_NAVY[700]
        },
        '& MuiOutlinedInput-input': {
          color: error
            ? redColor
            : darkMode
            ? 'white'
            : COLORS.AUTO_MOREIRA_NAVY[700]
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: error
              ? redColor
              : darkMode
              ? 'white'
              : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '&:hover fieldset': {
            borderColor: error
              ? redColor
              : darkMode
              ? 'white'
              : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '&.Mui-focused fieldset': {
            borderColor: error
              ? redColor
              : darkMode
              ? 'white'
              : COLORS.AUTO_MOREIRA_NAVY[700]
          }
        },
        '& .MuiOutlinedInput-root.Mui-disabled': {
          '& fieldset': {
            borderColor: error
              ? redColor
              : darkMode
              ? 'white'
              : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '&:hover fieldset': {
            borderColor: error
              ? redColor
              : darkMode
              ? 'white'
              : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '&.Mui-focused fieldset': {
            borderColor: error
              ? redColor
              : darkMode
              ? 'white'
              : COLORS.AUTO_MOREIRA_NAVY[700]
          }
        }
      }}
    />
  );
}
