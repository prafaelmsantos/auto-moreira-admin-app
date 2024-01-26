import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import AutoMoreiraRouter from '../../routes/AutoMoreiraRouter';

import SideBarRoutes from '../../routes/SideBarRoutes';
import { RouteType } from '../../models/enums/RouteType';

export interface ICurrentRoute {
  name: string;
  path: string;
}

export default function Admin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();

  const [currentRoute, setCurrentRoute] = useState<ICurrentRoute>({
    name: 'Painel Principal',
    path: 'dashboard'
  });

  const mobile = window.innerWidth < 1200;

  const [open, setOpen] = useState(!mobile);

  useEffect(() => {
    window.addEventListener('resize', () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  useEffect(() => {
    getActiveRoute(SideBarRoutes);
  }, [location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = 'Dashboard';
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + '/' + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute({ name: routes[i].name, path: routes[i].path });
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (
    routes: RoutesType[]
  ): string | boolean | undefined => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  /*  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  }; */

  const isPerfilRoute = location.pathname.includes('/admin/profile');

  return (
    <div className="flex h-full w-full">
      {!isPerfilRoute && <Sidebar {...{ open, setOpen, mobile }} />}
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 ${
            !isPerfilRoute ? 'xl:ml-[313px]' : ''
          }`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              setOpen={setOpen}
              open={open}
              currentRoute={currentRoute}
              secondary={getActiveNavbar(SideBarRoutes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              {/* <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
              </Routes> */}

              <AutoMoreiraRouter routeType={RouteType.ADMIN} />
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
