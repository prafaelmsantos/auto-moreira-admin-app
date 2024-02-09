import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { COLORS } from '../../../utils/Colors';

export const SwitchSX = () => {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: darkMode
        ? COLORS.AUTO_MOREIRA_BRAND[400]
        : COLORS.AUTO_MOREIRA_BRAND[500]
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: darkMode
        ? COLORS.AUTO_MOREIRA_BRAND[400]
        : COLORS.AUTO_MOREIRA_BRAND[500]
    },
    '& .MuiSwitch-track': {
      backgroundColor: COLORS.AUTO_MOREIRA_BRAND[100]
    }
  };
};
