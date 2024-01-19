/** @format */

import { Navigate, useRoutes } from 'react-router-dom';
import Vehicles from '../views/admin/vehicles/Vehicles';
import Marks from '../views/admin/marks/Marks';
import Models from '../views/admin/models/Models';
import SignIn from '../views/auth/SignIn';
import Profile from '../views/admin/profile';
import NFTMarketplace from '../views/admin/marketplace';
import DataTables from '../views/admin/tables';
import Mark from '../views/admin/marks/details/Mark';
import Dashboard from '../views/admin/default';
import { RouteName, RouteType } from '../models/enums/RouteType';
import Model from '../views/admin/models/details/Model';
import Vehicle from '../views/admin/vehicles/details/Vehicle';

interface IAutoMoreiraRouter {
  routeType: RouteType;
}

export const AdminRoutes = [
  {
    path: '/*',
    element: <Navigate to="/admin/dashboard" replace />,
    id: RouteName.DASHBOARD
  },
  /* {
      path: '/admin/*',
      element: <Dashboard />,
      id: 'dashboard'
    }, */
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
    id: RouteName.DASHBOARD
  },
  {
    path: '/admin/marks',
    id: RouteName.MARKS,
    children: [
      { index: true, element: <Marks /> },
      { path: ':id', element: <Mark /> },
      { path: 'add', element: <Mark /> }
    ]
  },
  {
    path: '/admin/models',
    id: RouteName.MODELS,
    children: [
      { index: true, element: <Models /> },
      { path: ':id', element: <Model /> }
    ]
  },
  {
    path: '/admin/vehicles',
    id: RouteName.VEHICLES,
    children: [
      { index: true, element: <Vehicles /> },
      { path: ':id', element: <Vehicle /> }
    ]
  },
  {
    path: '/admin/nft-marketplace',
    element: <NFTMarketplace />,
    id: 'nft-marketplace'
  },
  {
    path: '/admin/data-tables',
    element: <DataTables />,
    id: 'data-tables'
  },
  {
    path: '/admin/profile',
    element: <Profile />,
    id: RouteName.PROFILE
  }
];

const AuthRoutes = [
  {
    path: '/*',
    element: <Navigate to="/auth/sign-in" replace />,
    id: RouteName.SIGN_IN
  },
  {
    path: '/auth/sign-in',
    element: <SignIn />,
    id: RouteName.SIGN_IN
  }
];

export default function AutoMoreiraRouter({ routeType }: IAutoMoreiraRouter) {
  return useRoutes(routeType === RouteType.ADMIN ? AdminRoutes : AuthRoutes);
}
