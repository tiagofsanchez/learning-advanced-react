import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DEL_FROM_CART_MUTATION = gql`
  mutation DEL_FROM_CART_MUTATION($id: ID!) {
    deleteCardItem(id: $id) {
      id
    }
  }
`;

const DeleteFromCart = ({ id }) => {
  const [deleteCardItem, { loading }] = useMutation(DEL_FROM_CART_MUTATION, {
    variables: { id },
  });
  return (
    <button type="button" onClick={deleteCardItem} disabled={loading}>
      ␡
    </button>
  );
};

export default DeleteFromCart;
