import { IoCarSport } from 'react-icons/io5';
import { SiMercedes, SiThemodelsresource } from 'react-icons/si';
import { MdHome, MdLocalPolice, MdPerson } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
//import { LuMessagesSquare } from 'react-icons/lu';
import { RouteName } from '../models/enums/RouteType';

const SideBarRoutes = [
  {
    name: 'Painel Principal',
    layout: '/admin',
    path: RouteName.DASHBOARD,
    icon: <MdHome className="h-6 w-6" />
  },
  {
    name: 'Utilizadores',
    layout: '/admin',
    path: RouteName.USERS,
    icon: <FaUsers className="h-6 w-6" />
  },
  {
    name: 'Cargos de Utilizador',
    layout: '/admin',
    path: RouteName.ROLES,
    icon: <MdLocalPolice className="h-6 w-6" />
  },
  {
    name: 'Marcas',
    layout: '/admin',
    path: RouteName.MARKS,
    icon: <SiMercedes className="h-6 w-6" />
  },
  {
    name: 'Modelos',
    layout: '/admin',
    path: RouteName.MODELS,
    icon: <SiThemodelsresource className="h-6 w-6" />
  },
  {
    name: 'Veículos',
    layout: '/admin',
    path: RouteName.VEHICLES,
    icon: <IoCarSport className="h-6 w-6" />
  },
  {
    name: 'Mensagem de Clientes',
    layout: '/admin',
    path: RouteName.CLIENT_MESSAGES
    //icon: <LuMessagesSquare className="h-6 w-6" />
  },
  {
    name: 'Perfil',
    layout: '/admin',
    path: RouteName.PROFILE,
    icon: <MdPerson className="h-6 w-6" />
  }
];
export default SideBarRoutes;
