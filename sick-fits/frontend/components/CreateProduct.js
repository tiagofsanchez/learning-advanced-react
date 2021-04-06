import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useFormInput from '../hooks/useFormInput';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
    }
  }
`;

const CreateProduct = () => {
  const { inputs, clearForm, onChange } = useFormInput({
    image: '',
    name: '',
    price: '',
    description: '',
  });

  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await createProduct();
          clearForm();
          // Go to the product's page
          Router.push({
            pathname: `/product/${res.data.createProduct.id}`,
          });
        }}
      >
        <ErrorMessage error={error} />
        <fieldset aria-busy={loading} disabled={loading}>
          <label htmlFor="image">
            Image
            <input
              required
              type="file"
              name="image"
              id="image"
              onChange={onChange}
              accept="image/png, image/jpeg"
            />
          </label>
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
          <button type="submit">+ Add product</button>
        </fieldset>
      </Form>
    </>
  );
};
export default CreateProduct;
