import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';
import { TextFieldSX } from './style/TextFieldSX';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

type IAutoMoreiraTextFieldFormValidation = {
  error?: boolean;
  helperText?: string;
  label?: string;
  defaultValue?: string | number | null;
  name: string;
  required?: boolean;
  type?: string;
  multiline?: boolean;
  rows?: number;
  variant?: 'outlined' | 'standard' | 'filled';
  disableUnderline?: boolean;
  disabled?: boolean;
  endAdornment?: boolean;
  showPassword?: boolean;
  handleClickShowPassword?: () => void;
};

export default function AutoMoreiraTextFieldFormValidation({
  error,
  helperText,
  label,
  defaultValue,
  name,
  required,
  type,
  multiline,
  rows,
  variant,
  disableUnderline,
  disabled,
  endAdornment,
  showPassword,
  handleClickShowPassword
}: IAutoMoreiraTextFieldFormValidation) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  const redColor = '#d32f2f';

  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          required={required}
          type={endAdornment ? (showPassword ? type : 'password') : type}
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
            endAdornment: endAdornment && !disabled && (
              <InputAdornment position="end">
                <IconButton
                  color={'secondary'}
                  aria-label="toggle password visibility"
                  onClick={() =>
                    handleClickShowPassword && handleClickShowPassword()
                  }
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
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
      defaultValue={defaultValue}
    />
  );
}
