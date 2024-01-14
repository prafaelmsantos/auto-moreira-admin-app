import { TRANSMISSION } from "../graphql-global-types";

export enum Transmission {
  MANUAL = "Manual",
  AUTOMATIC = "Automatic",
}

export function TransmissionConverted(transmission: Transmission) {
  return transmission === Transmission.AUTOMATIC ? "Automático": "Manual";
}

export function TransmissionGraphQLConverted(transmission: TRANSMISSION) {
  return transmission === TRANSMISSION.AUTOMATIC ? Transmission.AUTOMATIC: Transmission.MANUAL;
}
