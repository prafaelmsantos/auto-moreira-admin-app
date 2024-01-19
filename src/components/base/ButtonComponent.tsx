/** @format */

import { Box, Button, Stack, Typography } from '@mui/material';
import { ButtonPropsColorOverrides } from '@mui/material/Button/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { OverridableStringUnion } from '@mui/types';

import { MouseEventHandler, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';

interface ButtonProps<T> {
  title: string;
  variant?: 'text' | 'outlined' | 'contained';
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<T>;
}

export default function ButtonComponent(props: ButtonProps<HTMLElement>) {
  const { title, variant = 'contained', icon, disabled, onClick } = props;
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return (
    <Button
      fullWidth
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      sx={{
        '&:hover': {
          backgroundColor: darkMode
            ? COLORS.AUTO_MOREIRA_BRAND[300]
            : COLORS.AUTO_MOREIRA_BRAND[600],
          boxShadow: 'none'
        },
        backgroundColor: darkMode
          ? COLORS.AUTO_MOREIRA_BRAND[400]
          : COLORS.AUTO_MOREIRA_BRAND[500],
        borderColor: darkMode
          ? COLORS.AUTO_MOREIRA_BRAND[400]
          : COLORS.AUTO_MOREIRA_BRAND[500],
        textTransform: 'none'
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        {icon && <>{icon}</>}
        <Box>
          <Typography>{title}</Typography>
        </Box>
      </Stack>
    </Button>
  );
}
