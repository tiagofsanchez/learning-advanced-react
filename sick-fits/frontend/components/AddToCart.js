import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($productId: ID!) {
    addToCart(productId: $productId) {
      id
      quantity
      product {
        id
        name
      }
    }
  }
`;

const AddToCart = () => {
  const [addToCart, { loading, data, error }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      variables: { productId: '603fbd54b8438c2794d357e2' },
    }
  );

  console.log({ loading, data, error });
  return (
    <button type="button" onClick={addToCart}>
      <p>add +</p>
    </button>
  );
};

export default AddToCart;
