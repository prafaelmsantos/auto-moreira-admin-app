import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';

type ITextFieldFormValidation = {
  error?: boolean;
  helperText?: string;
  label: string;
  control: Control<any, any>;
  defaultValue?: string | number;
  name: string;
  required?: boolean;
  type?: string;
};

export const TextFieldSX = (error: boolean) => {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const redColor = '#d32f2f';
  return {
    '& .MuiInputBase-input.Mui-disabled': {
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
    },
    '& .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
      color: error
        ? redColor
        : darkMode
        ? 'white'
        : COLORS.AUTO_MOREIRA_NAVY[700]
    },

    '& .MuiOutlinedInput-input': {
      color: error
        ? redColor
        : darkMode
        ? 'white'
        : COLORS.AUTO_MOREIRA_NAVY[700]
    }
  };
};

export default function TextFieldFormValidation({
  error,
  helperText,
  label,
  control,
  defaultValue,
  name,
  required,
  type
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
      name={name}
      control={control}
    />
  );
}
