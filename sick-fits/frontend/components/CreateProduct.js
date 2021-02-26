import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useFormInput from '../hooks/useFormInput';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Variables that are being passed
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
    name: 'Tiago',
    price: 1000,
    description: 'Nice picture',
  });

  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(inputs);
          await createProduct();
          clearForm();
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
