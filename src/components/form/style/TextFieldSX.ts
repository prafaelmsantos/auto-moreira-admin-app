import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { COLORS } from '../../../utils/Colors';

export const TextFieldSX = (error: boolean) => {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  const redColor = '#d32f2f';
  
  return {
    '& .MuiInput-underline:before': {
      borderBottomColor: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
    },
    '&:hover .MuiInput-underline:before': {
      borderBottomColor: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
    },
    '& .MuiInput-underline': {
      color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
    },
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: error
        ? redColor
        : darkMode
        ? 'white'
        : COLORS.AUTO_MOREIRA_NAVY[700],
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
  };
};
