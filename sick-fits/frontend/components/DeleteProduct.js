/* eslint-disable no-restricted-globals */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { ALL_PRODUCTS_QUERY } from './Products';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });

  if (loading) return <p>loading...</p>;
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete that product?')) {
          return deleteProduct();
        }
      }}
    >
      {children}
    </button>
  );
};

DeleteProduct.propTypes = {
  id: PropTypes.string,
  children: PropTypes.object,
};

export default DeleteProduct;
