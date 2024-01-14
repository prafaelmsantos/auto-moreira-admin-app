/** @format */

import { Alert, Snackbar } from '@mui/material';
import { blue, green, red, yellow } from '@mui/material/colors';
import { useMemo } from 'react';
import { MessageType } from '../../models/enums/MessageTypeEnum';

type ISnackbar = {
  type: MessageType;
  message: string;
  open: boolean;
  onClose: () => void;
};

export default function AutoMoreiraSnackbar(props: ISnackbar) {
  const { message, open, type, onClose } = props;

  const severityColor = useMemo(() => {
    switch (type) {
      case MessageType.SUCCESS:
        return 'success';
      case MessageType.ERROR:
        return 'error';
      case MessageType.WARNING:
        return 'warning';
      case MessageType.INFO:
        return 'info';
      default:
        return 'info';
    }
  }, [type]);

  const bgColor = useMemo(() => {
    switch (type) {
      case MessageType.SUCCESS:
        return green[500];
      case MessageType.ERROR:
        return red[500];
      case MessageType.WARNING:
        return yellow[500];
      case MessageType.INFO:
        return blue[500];
      default:
        return blue[500];
    }
  }, [type]);

  return (
    <Snackbar
      sx={{ width: '23%' }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <Alert
        variant="filled"
        onClose={onClose}
        severity={severityColor}
        sx={{ width: '100%', bgcolor: bgColor, color: 'white' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
