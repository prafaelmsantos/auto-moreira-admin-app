import React from 'react';

// Admin Imports
import Dashboard from './views/admin/default';
import NFTMarketplace from './views/admin/marketplace';
import Profile from './views/admin/profile';
import DataTables from './views/admin/tables';

// Auth Imports
import SignIn from './views/auth/SignIn';

// Icon Imports
import { CgProfile } from 'react-icons/cg';
import { IoCarSport } from 'react-icons/io5';
import { SiMercedes, SiThemodelsresource } from 'react-icons/si';
import { MdLogout, MdOutlineRateReview } from 'react-icons/md';
import { FaHome, FaUsers } from 'react-icons/fa';
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock
} from 'react-icons/md';
import Vehicles from './views/admin/vehicles/Vehicles';
import Marks from './views/admin/marks/Marks';
import Models from './views/admin/models/Models';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: 'home',
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />
  },
  {
    name: 'Marcas',
    layout: '/admin',
    path: 'marks',
    icon: <SiMercedes className="h-6 w-6" />,
    component: <Marks />
  },
  {
    name: 'Modelos',
    layout: '/admin',
    path: 'models',
    icon: <SiThemodelsresource className="h-6 w-6" />,
    component: <Models />
  },
  {
    name: 'Veículos',
    layout: '/admin',
    path: 'vehicles',
    icon: <IoCarSport className="h-6 w-6" />,
    component: <Vehicles />
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: 'nft-marketplace',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'data-tables',
    component: <DataTables />
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />
  }
];
export default routes;
