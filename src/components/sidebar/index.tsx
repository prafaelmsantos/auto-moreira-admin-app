/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';
import routes from '../../routes/SideBarRoutes';
import { useNavigate } from 'react-router-dom';

const Sidebar = (props: {
  open: boolean;
  mobile: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { open, setOpen, mobile } = props;

  const navigate = useNavigate();

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <button onClick={() => navigate('/admin/dashboard')}>
          <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            <span className="font-medium">Auto</span> Moreira
          </div>
        </button>
      </div>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links {...{ routes, setOpen, mobile }} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
