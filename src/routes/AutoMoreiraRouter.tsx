import { Navigate, useRoutes } from 'react-router-dom';
import Vehicles from '../views/admin/vehicles/Vehicles';
import Marks from '../views/admin/marks/Marks';
import Models from '../views/admin/models/Models';
import SignIn from '../views/auth/views/sign-in/SignIn';
import Profile from '../views/admin/users/views/profile/Profile';
import Mark from '../views/admin/marks/views/Mark';
import Dashboard from '../views/admin/dashboard/Dashboard';
import { RouteName, RouteType } from '../models/enums/RouteType';
import Model from '../views/admin/models/views/Model';
import Vehicle from '../views/admin/vehicles/views/Vehicle';
import ClientMessages from '../views/admin/client-messages/ClientMessages';
import Users from '../views/admin/users/Users';
import ClientMessage from '../views/admin/client-messages/views/ClientMessage';
import Roles from '../views/admin/roles/Roles';
import User from '../views/admin/users/views/User';
import Role from '../views/admin/roles/views/Role';
import ResetPassword from '../views/auth/views/reset-password/ResetPassword';

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
    path: '/admin/users',
    id: RouteName.USERS,
    children: [
      { index: true, element: <Users /> },
      { path: ':id', element: <User /> },
      { path: 'add', element: <User /> }
    ]
  },
  {
    path: '/admin/roles',
    id: RouteName.ROLES,
    children: [
      { index: true, element: <Roles /> },
      { path: ':id', element: <Role /> },
      { path: 'add', element: <Role /> }
    ]
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
    path: '/admin/client-messages',
    id: RouteName.CLIENT_MESSAGES,
    children: [
      { index: true, element: <ClientMessages /> },
      { path: ':id', element: <ClientMessage /> }
    ]
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
  },
  {
    path: '/auth/reset-password',
    element: <ResetPassword />,
    id: RouteName.RESET_PASSWORD
  }
];

export default function AutoMoreiraRouter({
  routeType
}: {
  routeType: RouteType;
}) {
  return useRoutes(routeType === RouteType.ADMIN ? AdminRoutes : AuthRoutes);
}
