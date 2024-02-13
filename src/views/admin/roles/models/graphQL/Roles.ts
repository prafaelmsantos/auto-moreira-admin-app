import { gql } from '@apollo/client';

export const ROLES = gql`
  query roles(
    $last: Int
    $first: Int
    $filter: RoleFilterInput
    $order: [RoleSortInput!]
  ) {
    roles(where: $filter, order: $order, first: $first, last: $last) {
      totalCount
      nodes {
        id
        name
      }
    }
  }
`;
