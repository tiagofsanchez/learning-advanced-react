import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        name
        email
        cart {
          id
          product {
            id
            price
            photo {
              image {
                publicUrlTransformed
              }
            }
            name
            description
          }
          quantity
        }
        orders {
          id
          items {
            id
            name
            description
            price
            quantity
            photo {
              image {
                id
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
