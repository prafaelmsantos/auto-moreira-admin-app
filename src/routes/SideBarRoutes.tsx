import React from 'react';

// Admin Imports
import Dashboard from '../views/admin/default';
import NFTMarketplace from '../views/admin/marketplace';
import Profile from '../views/admin/profile';
import DataTables from '../views/admin/tables';

// Auth Imports
import SignIn from '../views/auth/SignIn';

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
import Vehicles from '../views/admin/vehicles/Vehicles';
import Marks from '../views/admin/marks/Marks';
import Models from '../views/admin/models/Models';

const SideBarRoutes = [
  {
    name: 'Dashboard',
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
    name: 'NFT Marketplace',
    layout: '/admin',
    path: 'nft-marketplace',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,

    secondary: true
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'data-tables'
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />
  }
];
export default SideBarRoutes;
