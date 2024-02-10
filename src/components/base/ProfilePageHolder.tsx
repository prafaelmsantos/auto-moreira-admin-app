/** @format */

import { Box } from '@mui/material';
import ButtonComponent from './ButtonComponent';
import { IAction } from './PageHolder';

export type IProfilePageHolder = {
  actions: IAction[];
};

export default function ProfilePageHolder({ actions }: IProfilePageHolder) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1
      }}
    >
      {actions &&
        actions.map((action, key) => (
          <Box key={key} sx={{ pb: '0.3rem' }}>
            <ButtonComponent
              size={'small'}
              disabled={action.disabled}
              icon={action.icon}
              onClick={action.callback}
              variant={action.isOutlined ? 'outlined' : 'contained'}
            />
          </Box>
        ))}
    </Box>
  );
}
