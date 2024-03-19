import { FiAlignJustify } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import navbarimage from '../../assets/img/auth/back.jpg';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import avatar from '../../assets/img/avatars/default.png';
import Dropdown from '../dropdown';
import { ICurrentRoute } from '../../layouts/admin';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  logout,
  setCurrentUser,
  setUserDarkMode
} from '../../views/auth/services/AuthService';
import { useCallback, useState } from 'react';

const Navbar = (props: {
  currentRoute: ICurrentRoute;
  secondary?: boolean | string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { currentRoute, setOpen, open } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  const user = useSelector((state: RootState) => state.userSlice.user);

  const [openWrapper, setOpenWrapper] = useState(false);
  const [openWrapperProfile, setOpenWrapperProfile] = useState(false);

  const fetchUserDarkMode = useCallback(
    (darkMode: boolean) => {
      if (user) {
        setUserDarkMode(user.id, darkMode).then((data) =>
          setCurrentUser({ ...user, darkMode: data.darkMode }, dispatch)
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
            Admin /
          </span>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to={`/admin/${currentRoute.path}`}
          >
            {currentRoute.name}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <div className="font-bold capitalize hover:text-navy-700 dark:hover:text-white">
            {currentRoute.name}
          </div>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[160px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[160px] md:flex-grow-0 md:gap-1 xl:w-[160px] xl:gap-2">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={() => setOpen(!open)}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        <Dropdown
          openWrapper={openWrapper}
          setOpenWrapper={setOpenWrapper}
          button={
            <p className="cursor-pointer">
              <IoMdInformationCircleOutline className="h-4 w-4 text-gray-600 dark:text-white" />
            </p>
          }
          children={
            <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div
                style={{
                  backgroundImage: `url(${navbarimage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
                className="mb-2 aspect-video w-full rounded-lg"
              />
              <a
                onClick={() => setOpenWrapper(false)}
                target="blank"
                href="https://auto-moreira-app.onrender.com/"
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl bg-brand-500 py-[11px] font-bold text-white transition duration-200 hover:bg-brand-600 hover:text-white active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Auto Moreira Website
              </a>
              <a
                onClick={() => setOpenWrapper(false)}
                target="blank"
                href="https://horizon-ui.com/docs-tailwind/docs/react/installation?ref=live-free-tailwind-react"
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
              >
                Ver documentação
              </a>
              {/*  <a
                target="blank"
                href="https://horizon-ui.com/?ref=live-free-tailwind-react"
                className="hover:bg-black px-full linear flex cursor-pointer items-center justify-center rounded-xl py-[11px] font-bold text-navy-700 transition duration-200 hover:text-navy-700 dark:text-white dark:hover:text-white"
              >
                Try Horizon Free
              </a> */}
            </div>
          }
          classNames={'py-2 top-6 -left-[250px] md:-left-[330px] w-max'}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        />
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => fetchUserDarkMode(!darkMode)}
        >
          {darkMode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          openWrapper={openWrapperProfile}
          setOpenWrapper={setOpenWrapperProfile}
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={user?.image ?? avatar}
              alt={`${user?.firstName} ${user?.lastName}`}
            />
          }
          children={
            <div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="ml-4 mt-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {`👋 Olá, ${user?.firstName} ${user?.lastName}`}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="ml-4 mt-3 flex flex-col">
                <Link
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                  to={`/admin/admin/dashboard`}
                  onClick={() => setOpenWrapperProfile(false)}
                >
                  {'Painel Principal'}
                </Link>
                <Link
                  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                  to={`/admin/profile`}
                  onClick={() => setOpenWrapperProfile(false)}
                >
                  {'Perfil'}
                </Link>

                <Link
                  onClick={() => {
                    setOpenWrapperProfile(false);
                    logout(dispatch, navigate);
                  }}
                  to={'/auth/sign-in'}
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                >
                  {'Sair'}
                </Link>
              </div>
            </div>
          }
          classNames={'py-2 top-8 -left-[180px] w-max'}
        />
      </div>
    </nav>
  );
};

export default Navbar;
