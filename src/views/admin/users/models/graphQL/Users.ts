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
        userName
        firstName
        lastName
        imageUrl
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
