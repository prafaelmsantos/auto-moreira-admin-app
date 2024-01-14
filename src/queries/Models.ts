import { gql } from '@apollo/client';

export const MODELS = gql`
  query models(
    $last: Int
    $first: Int
    $filter: ModelFilterInput
    $order: [ModelSortInput!]
  ) {
    models(where: $filter, order: $order, first: $first, last: $last) {
      totalCount
      nodes {
        id
        name
        markId
        mark {
          id
          name
        }
      }
    }
  }
`;
