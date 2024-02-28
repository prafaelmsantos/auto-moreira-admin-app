
import { Status, StatusGraphQLConverted } from "./enums/StatusEnum";
import { clientMessages_clientMessages_nodes } from "./graphQL/types/clientMessages";


export interface IClientMessage {
  id: number;
  name: string;
  email: string;
  phoneNumber: number;
  message: string;
  status: Status;
  createdDate: Date;
}

export function convertToClientMessage(
  clientMessage: clientMessages_clientMessages_nodes
): IClientMessage {
  return {
    id: clientMessage.id,
    name: String(clientMessage.name),
    email: String(clientMessage.email),
    phoneNumber: Number(clientMessage.phoneNumber),
    message: String(clientMessage.message),
    status: StatusGraphQLConverted(clientMessage.status),
    createdDate: new Date(clientMessage.createdDate)
  };
}
