import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { COLORS } from '../../../utils/Colors';

export const InputPropsSX = (error: boolean) => {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const redColor = '#d32f2f';
  return error ? redColor : darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700];
};
