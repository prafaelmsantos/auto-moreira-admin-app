import { Box, Button, Stack } from '@mui/material';
import { COLORS } from '../../../../../../utils/Colors';
import { useSelector } from 'react-redux';
import { MdDeleteOutline } from 'react-icons/md';
import { RootState } from '../../../../../../redux/store';
import { LuUpload } from 'react-icons/lu';

interface IImageButton {
  deleteBtn?: boolean;
  handleClick: () => void;
}

const ImageButton = ({ deleteBtn, handleClick }: IImageButton) => {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return (
    <Stack
      direction="row"
      sx={{
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingX: 0.5
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
        <Button
          size="small"
          fullWidth
          onClick={handleClick}
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
            sx={{ py: 0.5, color: 'white' }}
          >
            {deleteBtn ? <MdDeleteOutline /> : <LuUpload />}
          </Stack>
        </Button>
      </Box>
    </Stack>
  );
};

export default ImageButton;
