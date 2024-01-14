/** @format */

import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { setUser } from './redux/userSlice';
import { closeModal } from './redux/modalSlice';

import { setFilters } from './redux/filtersSlice';
import { RootState } from './redux/store';
import AutoMoreiraSnackbar from './components/shared/AutoMoreiraSnackbar';
import AutoMoreiraLoader from './components/shared/AutoMoreiraLoader';

import { getCurrentFilters, getCurrentUser } from './config/localStorage';
import Auth from './layouts/auth';
import Admin from './layouts/admin';
import AlertModal from './components/shared/AlertModal';
import { closeSnackBar } from './redux/snackBarSlice';

const App = () => {
  const dispatch = useAppDispatch();

  const user = getCurrentUser();

  const filters = getCurrentFilters();

  useEffect(() => {
    user && dispatch(setUser(user));
  }, [user]);

  useEffect(() => {
    filters && dispatch(setFilters(filters));
  }, [filters]);

  /*   useEffect(() => {
    fetchIntercept.register({
      request: function (url: Request | string, config: InterceptorRequest) {
        let address: string;

        if (url instanceof Request) address = url.url;
        else address = url;

        if (user) {
          if (config.body instanceof FormData) {
            return [url, config];
          }

          if (user && config) {
            config.headers.Authorization = `Bearer ${user.token}`;
            return [address, config];
          } else {
            config.headers.Authorization = "";
            return Promise.reject();
          }
        } else {
          config.headers.Authorization = "";
          return Promise.reject();
        }
      },

      requestError: function (error) {
        return Promise.reject(error);
      },

      response: function (response) {
        return response;
      },

      responseError: function (error) {
        return Promise.reject(error);
      },
    });
  }, [user]); */

  const currentLoader = useSelector(
    (state: RootState) => state.loaderSlice.loader
  );

  const currentModal = useSelector((state: RootState) => state.modalSlice);
  const currentSnackBar = useSelector(
    (state: RootState) => state.snackBarSlice
  );

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
      <Routes>
        <Route path="auth/*" element={<Auth />} />
        <Route path="admin/*" element={<Admin />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </>
  );
};

export default App;
