/** @format */

import { Backdrop } from '@mui/material';
import { useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import { LengthType } from 'react-spinners/helpers/props';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';

type IAutoMoreiraLoader = {
  open: boolean;
  color?: string;
  height?: LengthType;
  width?: LengthType;
};

export default function AutoMoreiraLoader(props: IAutoMoreiraLoader) {
  const { open, color, height, width } = props;
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return (
    <Backdrop
      sx={{
        color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700],
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      open={open}
    >
      <ScaleLoader
        height={height ?? 60}
        width={width ?? 30}
        color={
          color ?? darkMode
            ? COLORS.AUTO_MOREIRA_BRAND[400]
            : COLORS.AUTO_MOREIRA_BRAND[500]
        }
      />
    </Backdrop>
  );
}
