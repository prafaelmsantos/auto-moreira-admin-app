import { STATUS } from "../../../../../models/graphQL/graphql-global-types";

export enum Status {
    OPEN = 1,
    CLOSED = 2
}

export function StatusConverted(status: Status) {
  return status === Status.OPEN
    ? 'Aberto'
    : 'Fechado'
}

export function StatusGraphQLConverted(status: STATUS) {
  return status === STATUS.OPEN
    ? Status.OPEN
    : Status.CLOSED
}

type IStatus = {
  id: Status;
  name: string;
};

export const StatusMenu: IStatus[] = [
  { id: Status.OPEN, name: StatusConverted(Status.OPEN) },
  { id: Status.CLOSED, name: StatusConverted(Status.CLOSED) }
];