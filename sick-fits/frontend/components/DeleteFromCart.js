import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

// evicting the deleted product from the cache
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCardItem));
};

const DEL_FROM_CART_MUTATION = gql`
  mutation DEL_FROM_CART_MUTATION($id: ID!) {
    deleteCardItem(id: $id) {
      id
    }
  }
`;

// eslint-disable-next-line react/prop-types
const DeleteFromCart = ({ id }) => {
  const [deleteCardItem, { loading }] = useMutation(DEL_FROM_CART_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <BigButton type="button" onClick={deleteCardItem} disabled={loading}>
      &times;
    </BigButton>
  );
};

export default DeleteFromCart;
