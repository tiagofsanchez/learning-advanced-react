import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($productId: ID!) {
    addToCart(productId: $productId) {
      id
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { productId: id },
  });

  return (
    <button type="button" onClick={addToCart}>
      <p>add +</p>
    </button>
  );
};

export default AddToCart;
