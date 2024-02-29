import { gql } from '@apollo/client';

export const USERS = gql`
  query users(
    $last: Int
    $first: Int
    $filter: UserFilterInput
    $order: [UserSortInput!]
  ) {
    users(where: $filter, order: $order, first: $first, last: $last) {
      totalCount
      nodes {
        id
        firstName
        lastName
        image
        phoneNumber
        email
        roles {
          id
          name
        }
      }
    }
  }
`;
