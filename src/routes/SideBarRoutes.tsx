// Admin Imports

// Auth Imports

// Icon Imports
import { IoCarSport } from 'react-icons/io5';
import { SiMercedes, SiThemodelsresource } from 'react-icons/si';
import { MdHome, MdPerson } from 'react-icons/md';

const SideBarRoutes = [
  {
    name: 'Painel Principal',
    layout: '/admin',
    path: 'dashboard',
    icon: <MdHome className="h-6 w-6" />
  },
  {
    name: 'Marcas',
    layout: '/admin',
    path: 'marks',
    icon: <SiMercedes className="h-6 w-6" />
  },
  {
    name: 'Modelos',
    layout: '/admin',
    path: 'models',
    icon: <SiThemodelsresource className="h-6 w-6" />
  },
  {
    name: 'Veículos',
    layout: '/admin',
    path: 'vehicles',
    icon: <IoCarSport className="h-6 w-6" />
  },
  {
    name: 'Perfil',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />
  }
  /*   {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />
  } */
];
export default SideBarRoutes;
