import { TRANSMISSION } from '../../../../../models/graphQL/graphql-global-types';

export enum Transmission {
  MANUAL = 1,
  AUTOMATIC = 2
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
