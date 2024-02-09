import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { COLORS } from "../../../utils/Colors";

export const AutocompleteSX = (error: boolean) => {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const redColor = '#d32f2f';
  return {
    /* '& .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
      color: error
        ? redColor
        : darkMode
        ? 'white'
        : COLORS.AUTO_MOREIRA_NAVY[700]
    }, */
    '& .MuiButtonBase-root': {
      color: error
        ? redColor
        : darkMode
        ? 'white'
        : COLORS.AUTO_MOREIRA_NAVY[700]
    },
    '& .MuiButtonBase-root.Mui-disabled': {
      color: error ? redColor : darkMode ? 'gray' : 'gray'
    },
    '& label.MuiInputLabel-root': {
      color: error
        ? redColor
        : darkMode
        ? 'white'
        : COLORS.AUTO_MOREIRA_NAVY[700]
    },
    '& label.MuiInputLabel-root.Mui-disabled': {
      color: error ? redColor : darkMode ? 'gray' : 'gray'
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
        borderColor: error ? redColor : darkMode ? 'gray' : 'gray'
      },
      '&:hover fieldset': {
        borderColor: error ? redColor : darkMode ? 'gray' : 'gray'
      },
      '& .Mui-focused fieldset': {
        borderColor: error
          ? redColor
          : darkMode
          ? COLORS.AUTO_MOREIRA_GRAY[900]
          : COLORS.AUTO_MOREIRA_GRAY[900]
      }
    }
  };
};