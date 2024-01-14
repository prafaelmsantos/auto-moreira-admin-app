import { NavLinkType, NavType } from '../models/enums/NavLinkType';

export const navLink = [
  {
    id: 1,
    url: '/',
    link: 'Início',
    type: NavLinkType.HOME,
    navType: NavType.MAIN
  },
  {
    id: 2,
    url: '/about',
    link: 'Sobre Nós',
    type: NavLinkType.ABOUT,
    navType: NavType.MAIN
  },
  {
    id: 3,
    url: '/vehicles',
    link: 'Veículos',
    type: NavLinkType.VEHICLES,
    navType: NavType.MAIN
  },
  {
    id: 4,
    url: '/testimonials',
    link: 'Testemunhos',
    type: NavLinkType.TESTIMONIALS,
    navType: NavType.MAIN
  },
  {
    id: 5,
    url: '/team',
    link: 'A Nossa Equipa',
    type: NavLinkType.TEAM,
    navType: NavType.MAIN
  },
  {
    id: 6,
    url: '/contact',
    link: 'Contactos',
    type: NavLinkType.CONTACT,
    navType: NavType.MAIN
  },
  {
    id: 7,
    url: '/user/login',
    link: 'Entrar',
    type: NavLinkType.LOGIN,
    navType: NavType.USER
  },
  {
    id: 8,
    url: '/user/registration',
    link: 'Registar',
    type: NavLinkType.REGISTRATION,
    navType: NavType.USER
  },
  {
    id: 9,
    url: '/admin',
    link: 'Vista Geral',
    type: NavLinkType.ADMIN_HOME,
    navType: NavType.ADMIN
  },
  {
    id: 10,
    url: '/admin/profile',
    link: 'Minha Conta',
    type: NavLinkType.ADMIN_PROFILE,
    navType: NavType.ADMIN
  },
  {
    id: 11,
    url: '/admin/users',
    link: 'Utilizadores',
    type: NavLinkType.ADMIN_USERS,
    navType: NavType.ADMIN
  },
  {
    id: 12,
    url: '/admin/marks',
    link: 'Marcas',
    type: NavLinkType.ADMIN_MARKS,
    navType: NavType.ADMIN
  },
  {
    id: 13,
    url: '/admin/models',
    link: 'Modelos',
    type: NavLinkType.ADMIN_MODELS,
    navType: NavType.ADMIN
  },
  {
    id: 14,
    url: '/admin/vehicles',
    link: 'Veículos',
    type: NavLinkType.ADMIN_VEHICLES,
    navType: NavType.ADMIN
  },
  {
    id: 15,
    url: '/admin/clients',
    link: 'Clientes',
    type: NavLinkType.ADMIN_CLIENTS,
    navType: NavType.ADMIN
  }
];

export enum LinkType {
  HOME,
  ABOUT,
  VEHICLES,
  TESTIMONIALS,
  TEAM,
  CONTACT,
  LOGIN,
  REGISTRATION,
  ADMIN,
  ADMIN_VEHICLE,
  ADMIN_GERAL_VEHICLE,
  ADMIN_MARK,
  ADMIN_MODEL,
  ADMIN_INFO,
  ADMIN_USER,
  PROFILE
}
