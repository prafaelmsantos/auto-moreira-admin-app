import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';
import { TextFieldSX } from './style/TextFieldSX';

type ITextFieldFormValidation = {
  error?: boolean;
  helperText?: string;
  label?: string;
  control: Control<any, any>;
  defaultValue?: string | number | null;
  name: string;
  required?: boolean;
  type?: string;
  multiline?: boolean;
  rows?: number;
  variant?: 'outlined' | 'standard' | 'filled';
  disableUnderline?: boolean;
  disabled?: boolean;
};

export default function TextFieldFormValidation({
  error,
  helperText,
  label,
  control,
  defaultValue,
  name,
  required,
  type,
  multiline,
  rows,
  variant,
  disableUnderline,
  disabled
}: ITextFieldFormValidation) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const redColor = '#d32f2f';

  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          required={required}
          type={type}
          label={label}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          fullWidth
          margin="dense"
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
          variant={variant}
          InputProps={{
            disableUnderline: disableUnderline,
            style: {
              color: error
                ? redColor
                : darkMode
                ? 'white'
                : COLORS.AUTO_MOREIRA_NAVY[700]
            }
          }}
          sx={TextFieldSX(error ?? false)}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  );
}
