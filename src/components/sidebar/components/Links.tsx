/* eslint-disable */

import { Link, useLocation } from 'react-router-dom';
import DashIcon from '../../icons/DashIcon';
import { getCurrentUser } from '../../../views/auth/services/AuthService';
import { RouteName } from '../../../models/enums/RouteType';

export const SidebarLinks = (props: {
  routes: RoutesType[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobile: boolean;
}): JSX.Element => {
  // Chakra color mode
  let location = useLocation();

  const { routes, setOpen, mobile } = props;

  const userAdmin =
    !getCurrentUser()?.roles[0]?.isDefault &&
    getCurrentUser()?.roles[0]?.isReadOnly;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) =>
    location.pathname.includes(routeName);

  const routesFiltered = userAdmin
    ? routes
    : routes.filter(
        (x) => x.path !== RouteName.USERS && x.path !== RouteName.ROLES
      );

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      if (
        route.name !== 'Perfil' &&
        (route.layout === '/admin' || route.layout === '/auth')
      ) {
        return (
          <Link
            key={index}
            to={route.layout + '/' + route.path}
            onClick={() => mobile && setOpen(false)}
          >
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? 'font-bold text-brand-500 dark:text-white'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? 'font-bold text-navy-700 dark:text-white'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return <>{createLinks(routesFiltered)}</>;
};

export default SidebarLinks;
