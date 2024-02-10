import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { COLORS } from "../../../utils/Colors";

export const AutocompleteSX = (error: boolean) => {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const redColor = '#d32f2f';
  return {
     '& .MuiInput-underline:before': {
            borderBottomColor: darkMode
              ? 'white'
              : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '&:hover .MuiInput-underline:before': {
            borderBottomColor: darkMode
              ? 'white'
              : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: darkMode
              ? 'white'
              : COLORS.AUTO_MOREIRA_NAVY[700]
          },
    '& .MuiButtonBase-root': {
      color: error
        ? redColor
        : darkMode
        ? 'white'
        : COLORS.AUTO_MOREIRA_NAVY[700]
    },
    '& .MuiButtonBase-root.Mui-disabled': {
      color: error ? redColor : darkMode ? COLORS.AUTO_MOREIRA_GRAY[600]: COLORS.AUTO_MOREIRA_GRAY[600]
    },
    '& label.MuiInputLabel-root': {
      color: error
        ? redColor
        : darkMode
        ? 'white'
        : COLORS.AUTO_MOREIRA_NAVY[700]
    },
    '& label.MuiInputLabel-root.Mui-disabled': {
      color: error ? redColor : darkMode ? COLORS.AUTO_MOREIRA_GRAY[600]: COLORS.AUTO_MOREIRA_GRAY[600]
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
        borderColor: error ? redColor : darkMode ? COLORS.AUTO_MOREIRA_GRAY[600] : COLORS.AUTO_MOREIRA_GRAY[600]
      },
      '&:hover fieldset': {
        borderColor: error ? redColor : darkMode ? COLORS.AUTO_MOREIRA_GRAY[600] : COLORS.AUTO_MOREIRA_GRAY[600]
      },
      '& .Mui-focused fieldset': {
        borderColor: error
          ? redColor
          : darkMode
          ? COLORS.AUTO_MOREIRA_GRAY[600]
          : COLORS.AUTO_MOREIRA_GRAY[600]
      }
    }
  };
};