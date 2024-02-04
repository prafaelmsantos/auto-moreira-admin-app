import { Autocomplete, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';

type IAutocompleteFormValidation = {
  error: boolean;
  helperText?: string;
  label: string;
  control: Control<any, any>;
  options: any[];
  defaultValue?: any;
  name: string;
};

export const AutocompleteFormValidationSX = (error: boolean) => {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const redColor = '#d32f2f';
  return {
    '& .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
      color: error
        ? redColor
        : darkMode
        ? 'white'
        : COLORS.AUTO_MOREIRA_NAVY[700]
    },
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
    '& .MuiOutlinedInput-input': {
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
      '& .Mui-focused fieldset': {
        borderColor: error
          ? redColor
          : darkMode
          ? 'white'
          : COLORS.AUTO_MOREIRA_NAVY[700]
      }
    }
  };
};
export default function AutocompleteFormValidation({
  error,
  helperText,
  label,
  control,
  options,
  defaultValue,
  name
}: IAutocompleteFormValidation) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const redColor = '#d32f2f';

  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label={label}
              variant="outlined"
              error={error}
              helperText={helperText}
              sx={{
                '& .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
                  color: error
                    ? redColor
                    : darkMode
                    ? 'white'
                    : COLORS.AUTO_MOREIRA_NAVY[700]
                },
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
                '& .MuiOutlinedInput-input': {
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
                  '& .Mui-focused fieldset': {
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
          onChange={(_, data) => field.onChange(data)}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  );
}
