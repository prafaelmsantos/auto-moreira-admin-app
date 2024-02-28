import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { setUser } from './redux/userSlice';
import { closeModal } from './redux/modalSlice';

import { RootState } from './redux/store';
import AutoMoreiraSnackbar from './components/snackBar/AutoMoreiraSnackbar';
import AutoMoreiraLoader from './components/loader/AutoMoreiraLoader';

import { getCurrentUser } from './config/localStorage';
import Auth from './layouts/auth';
import Admin from './layouts/admin';
import AlertModal from './components/modal/AlertModal';
import { closeSnackBar } from './redux/snackBarSlice';
import { ThemeProvider, createTheme } from '@mui/material';
import { COLORS } from './utils/Colors';

const App = () => {
  const dispatch = useAppDispatch();

  const user = getCurrentUser();

  useEffect(() => {
    user && dispatch(setUser(user));
  }, []);

  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const currentLoader = useSelector(
    (state: RootState) => state.loaderSlice.loader
  );

  const currentModal = useSelector((state: RootState) => state.modalSlice);
  const currentSnackBar = useSelector(
    (state: RootState) => state.snackBarSlice
  );
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const theme = createTheme({
    palette: {
      primary: {
        main: COLORS.AUTO_MOREIRA_NAVY[700]
      },
      secondary: {
        light: darkMode ? '#ffffff' : COLORS.AUTO_MOREIRA_NAVY[700],
        dark: darkMode ? '#ffffff' : COLORS.AUTO_MOREIRA_NAVY[700],
        contrastText: darkMode ? '#ffffff' : COLORS.AUTO_MOREIRA_NAVY[700],
        main: darkMode ? '#ffffff' : COLORS.AUTO_MOREIRA_NAVY[700]
      }
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(',')
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <AutoMoreiraLoader open={currentLoader} />
        <AlertModal
          title={currentModal.modal.title}
          message={currentModal.modal.message}
          isOpen={currentModal.modal.open}
          onOk={() => dispatch(closeModal())}
          type={currentModal.modal.type}
        />
        <AutoMoreiraSnackbar
          type={currentSnackBar.snackBar.type}
          message={currentSnackBar.snackBar.message}
          open={currentSnackBar.snackBar.open}
          onClose={() => dispatch(closeSnackBar())}
        />
        {user ? <Admin /> : <Auth />}
      </ThemeProvider>
    </>
  );
};

export default App;
