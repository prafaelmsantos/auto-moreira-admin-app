import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';

type ITextFieldFormValidation = {
  error: boolean;
  helperText?: string;
  label: string;
  control: Control<any, any>;
  defaultValue?: string | number;
};
export default function TextFieldFormValidation({
  error,
  helperText,
  label,
  control,
  defaultValue
}: ITextFieldFormValidation) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const redColor = '#d32f2f';

  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          required
          label={label}
          fullWidth
          margin="dense"
          error={error}
          helperText={helperText}
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
      )}
      name="TextField"
      control={control}
    />
  );
}
