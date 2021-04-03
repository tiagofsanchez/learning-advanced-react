/* eslint-disable no-restricted-globals */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const DELETE_PRODUCTIMAGE_MUTATION = gql`
  mutation DELETE_PRODUCTIMAGE_MUTATION($id: ID!) {
    deleteProductImage(id: $id) {
      id
    }
  }
`;

// evicting the deleted product from the cache
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children, productId }) => {
  console.log(productId);
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  const [deleteProductImage] = useMutation(DELETE_PRODUCTIMAGE_MUTATION, {
    variables: { id: productId },
  });

  if (loading) return <p>loading...</p>;
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete that product?')) {
          deleteProductImage();
          deleteProduct();
        }
      }}
    >
      {children}
    </button>
  );
};

DeleteProduct.propTypes = {
  id: PropTypes.string,
  children: PropTypes.array,
  productId: PropTypes.string,
};

export default DeleteProduct;
