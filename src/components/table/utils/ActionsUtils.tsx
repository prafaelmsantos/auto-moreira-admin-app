import { RouteName } from '../../../models/enums/RouteType';

export function ActionName(routeName: RouteName): string {
  switch (routeName) {
    case RouteName.MARKS:
      return 'Marca';
    case RouteName.MODELS:
      return 'Modelo';
    case RouteName.USERS:
      return 'Utilizador';
    case RouteName.ROLES:
      return 'Cargo';
    case RouteName.VEHICLES:
      return 'Veículo';
    case RouteName.CLIENT_MESSAGES:
      return 'Mensagem de Cliente';
    default:
      return '';
  }
}

export function ActionSubs(routeName: RouteName): string {
  switch (routeName) {
    case RouteName.MARKS:
    case RouteName.CLIENT_MESSAGES:
      return 'a';
    default:
      return 'o';
  }
}
