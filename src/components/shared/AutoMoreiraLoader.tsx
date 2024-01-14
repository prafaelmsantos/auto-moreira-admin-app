/** @format */

import { Backdrop } from '@mui/material';
import { ScaleLoader } from 'react-spinners';
import { LengthType } from 'react-spinners/helpers/props';

type IAutoMoreiraLoader = {
  open: boolean;
  color?: string;
  height?: LengthType;
  width?: LengthType;
};

export default function AutoMoreiraLoader(props: IAutoMoreiraLoader) {
  const { open, color, height, width } = props;

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <ScaleLoader
        height={height ?? 60}
        width={width ?? 30}
        color={color ?? '#ff4d30'}
      />
    </Backdrop>
  );
}
