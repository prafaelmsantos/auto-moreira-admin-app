/** @format */

import { Box, Stack } from '@mui/material';
import ButtonComponent from './ButtonComponent';

export type IAction = {
  isOutlined?: boolean;
  isError?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
  callback: () => void;
};

export type IPageHolder = {
  actions: IAction[];
};

export default function PageHolder({ actions }: IPageHolder) {
  return (
    <>
      <Stack sx={{ height: '100%', mt: 3 }}>
        <Stack
          direction="row"
          sx={{
            minHeight: '50px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
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
        </Stack>
      </Stack>
    </>
  );
}
