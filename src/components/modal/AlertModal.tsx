/** @format */

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
  Dialog,
  DialogTitle,
  Grid,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Card
} from '@mui/material';

import { useMemo } from 'react';
import { MessageType } from '../../models/enums/MessageTypeEnum';
import { COLORS } from '../../utils/Colors';

type IAlertModal = {
  message: string;
  type?: MessageType;
  title?: string;
  isOpen: boolean;
  onOk?: () => void;
  onYes?: () => void;
  onNo?: () => void;
  onCancel?: () => void;
};

export default function AlertModal(props: IAlertModal) {
  const { message, title, isOpen, type, onOk, onYes, onNo, onCancel } = props;

  const styleItem = {
    mt: 1,
    color: 'white'
  };

  const color = useMemo(() => {
    switch (type) {
      case MessageType.ERROR:
        return COLORS.AUTO_MOREIRA_RED;
      case MessageType.WARNING:
        return COLORS.AUTO_MOREIRA_ALTERNATIVE_YELLOW;
      case MessageType.INFO:
        return COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE;
      case MessageType.SUCCESS:
        return COLORS.AUTO_MOREIRA_GREEN;
      default:
        return COLORS.AUTO_MOREIRA_GREEN;
    }
  }, [type]);

  const icon = useMemo(() => {
    const styleIcon = {
      fontSize: 45
    };
    switch (type) {
      case MessageType.ERROR:
        return <ErrorOutlineIcon sx={styleIcon} />;
      case MessageType.WARNING:
        return <WarningAmberIcon sx={styleIcon} />;
      case MessageType.INFO:
        return <InfoOutlinedIcon sx={styleIcon} />;
      case MessageType.SUCCESS:
        return <CheckCircleOutlineOutlinedIcon sx={styleIcon} />;
      default:
        return <CheckCircleOutlineOutlinedIcon sx={styleIcon} />;
    }
  }, [type]);

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        style: {
          boxShadow: 'none',
          backgroundColor: 'transparent'
        }
      }}
    >
      <Card>
        <Box sx={{ height: 70, bgcolor: color }}>
          <DialogTitle sx={{ m: 0, p: 2 }}>
            <Grid container spacing={1}>
              <Grid item sx={{ color: 'white' }}>
                {icon}
              </Grid>
              {!title && (
                <Grid item sx={styleItem}>
                  {type}
                </Grid>
              )}
              <Grid item sx={styleItem}>
                <Typography variant="h5">{title}</Typography>
              </Grid>
            </Grid>
          </DialogTitle>
        </Box>

        <Box sx={{ bgcolor: 'white' }}>
          <DialogContent dividers>
            <Typography sx={{ fontSize: 16 }}>{message}</Typography>
          </DialogContent>
        </Box>
        <Box sx={{ height: 70, bgcolor: 'white' }}>
          <DialogActions sx={{ pt: 2 }}>
            {type !== MessageType.ERROR && type !== MessageType.INFO && (
              <>
                {onCancel && (
                  <Button
                    size="small"
                    onClick={onCancel}
                    variant="outlined"
                    sx={{ color: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE }}
                  >
                    <Typography sx={{ fontSize: 16 }}>Cancelar</Typography>
                  </Button>
                )}
                {onOk && (
                  <Button
                    size="small"
                    onClick={onOk}
                    variant={onCancel ? 'contained' : 'outlined'}
                    sx={
                      onCancel
                        ? {
                            '&:hover': {
                              backgroundColor: COLORS.AUTO_MOREIRA_BLUE,
                              boxShadow: 'none'
                            },
                            backgroundColor:
                              COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE,
                            borderColor: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE
                          }
                        : { color: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE }
                    }
                  >
                    <Typography sx={{ fontSize: 16 }}>OK</Typography>
                  </Button>
                )}
              </>
            )}
            {type === MessageType.ERROR && onOk && (
              <Button
                size="small"
                onClick={onOk}
                variant="outlined"
                sx={{
                  '&:hover': {
                    backgroundColor: 'white',
                    borderColor: COLORS.AUTO_MOREIRA_GREY
                  },
                  borderColor: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE,
                  color: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE
                }}
              >
                <Typography sx={{ fontSize: 16 }}>OK</Typography>
              </Button>
            )}
            {type === MessageType.INFO && (
              <>
                {onOk && !onYes && !onNo && (
                  <Button
                    size="small"
                    onClick={onOk}
                    variant={onCancel ? 'contained' : 'outlined'}
                    sx={
                      onCancel
                        ? {
                            '&:hover': {
                              backgroundColor: COLORS.AUTO_MOREIRA_BLUE,
                              boxShadow: 'none'
                            },
                            backgroundColor:
                              COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE,
                            borderColor: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE
                          }
                        : { color: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE }
                    }
                  >
                    <Typography sx={{ fontSize: 16 }}>OK</Typography>
                  </Button>
                )}
                {onYes && (
                  <Button
                    size="small"
                    onClick={onYes}
                    variant={'contained'}
                    sx={{
                      '&:hover': {
                        backgroundColor: COLORS.AUTO_MOREIRA_BLUE,
                        boxShadow: 'none'
                      },
                      backgroundColor: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE,
                      borderColor: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE
                    }}
                  >
                    <Typography sx={{ fontSize: 16 }}>Sim</Typography>
                  </Button>
                )}

                {onNo && (
                  <Button
                    size="small"
                    onClick={onNo}
                    variant={'outlined'}
                    sx={{ color: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE }}
                  >
                    <Typography sx={{ fontSize: 16 }}>Não</Typography>
                  </Button>
                )}
                {onCancel && (
                  <Button
                    size="small"
                    onClick={onCancel}
                    variant={'outlined'}
                    sx={{ color: COLORS.AUTO_MOREIRA_ALTERNATIVE_BLUE }}
                  >
                    <Typography sx={{ fontSize: 16 }}>Cancelar</Typography>
                  </Button>
                )}
              </>
            )}
          </DialogActions>
        </Box>
      </Card>
    </Dialog>
  );
}
