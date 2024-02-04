import { TRANSMISSION } from '../../../../../models/graphql-global-types';

export enum Transmission {
  MANUAL = 'Manual',
  AUTOMATIC = 'Automatic'
}

export function TransmissionConverted(transmission: Transmission) {
  return transmission === Transmission.AUTOMATIC ? 'Automático' : 'Manual';
}

export function TransmissionGraphQLConverted(transmission: TRANSMISSION) {
  return transmission === TRANSMISSION.AUTOMATIC
    ? Transmission.AUTOMATIC
    : Transmission.MANUAL;
}

type ITransmission = {
  id: Transmission;
  name: string;
};

export const transmissions: ITransmission[] = [
  {
    id: Transmission.MANUAL,
    name: TransmissionConverted(Transmission.MANUAL)
  },
  {
    id: Transmission.AUTOMATIC,
    name: TransmissionConverted(Transmission.AUTOMATIC)
  }
];
