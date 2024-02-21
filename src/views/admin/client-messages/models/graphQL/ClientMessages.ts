import { gql } from '@apollo/client';

export const CLIENT_MESSAGES = gql`
  query clientMessages(
    $last: Int
    $first: Int
    $filter: ClientMessageFilterInput
    $order: [ClientMessageSortInput!]
  ) {
    clientMessages(where: $filter, order: $order, first: $first, last: $last) {
      totalCount
      nodes {
        id
        name
        email
        message
        phoneNumber
        createdDate
      }
    }
  }
`;
