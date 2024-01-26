import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { setUser } from './redux/userSlice';
import { closeModal } from './redux/modalSlice';

import { RootState } from './redux/store';
import AutoMoreiraSnackbar from './components/shared/AutoMoreiraSnackbar';
import AutoMoreiraLoader from './components/shared/AutoMoreiraLoader';

import { getCurrentUser } from './config/localStorage';
import Auth from './layouts/auth';
import Admin from './layouts/admin';
import AlertModal from './components/shared/AlertModal';
import { closeSnackBar } from './redux/snackBarSlice';

const App = () => {
  const dispatch = useAppDispatch();

  const user = getCurrentUser();

  useEffect(() => {
    user && dispatch(setUser(user));
  }, [user]);

  const currentLoader = useSelector(
    (state: RootState) => state.loaderSlice.loader
  );

  const currentModal = useSelector((state: RootState) => state.modalSlice);
  const currentSnackBar = useSelector(
    (state: RootState) => state.snackBarSlice
  );

  console.log(user);

  return (
    <>
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
    </>
  );
};

export default App;
