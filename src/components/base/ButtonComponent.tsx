import { Button, Stack } from '@mui/material';

import { MouseEventHandler, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';

interface ButtonProps<T> {
  variant?: 'text' | 'outlined' | 'contained';
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<T>;
  size?: 'small' | 'medium' | 'large';
}

export default function ButtonComponent({
  variant = 'contained',
  icon,
  disabled,
  onClick,
  size
}: ButtonProps<HTMLElement>) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return (
    <Button
      size={size}
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
        sx={{ py: 0.5 }}
      >
        {icon && <>{icon}</>}
      </Stack>
    </Button>
  );
}
