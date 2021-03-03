import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import useFormInput from '../hooks/useFormInput';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      id
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    #   this is how the mutation is expecting the variables
    $id: ID!
    $name: String!
    $description: String!
    $price: Int!
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  const { inputs, clearForm, onChange } = useFormInput(data?.Product);

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  if (loading) return <p>Loading... </p>;
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            ...inputs,
          },
        }).catch(console.error);
        console.log(res);
      }}
    >
      <ErrorMessage error={error || updateError} />
      <fieldset aria-busy={updateLoading} disabled={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={inputs.name}
            onChange={onChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="price"
            value={inputs.price}
            onChange={onChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="description"
            value={inputs.description}
            onChange={onChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};

UpdateProduct.propTypes = {
  id: PropTypes.string,
};

export default UpdateProduct;
