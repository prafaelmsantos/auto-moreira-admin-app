import { gql } from '@apollo/client';

export const MARKS = gql`
  query marks(
    $last: Int
    $first: Int
    $filter: MarkFilterInput
    $order: [MarkSortInput!]
  ) {
    marks(where: $filter, order: $order, first: $first, last: $last) {
      totalCount
      nodes {
        id
        name
      }
    }
  }
`;
