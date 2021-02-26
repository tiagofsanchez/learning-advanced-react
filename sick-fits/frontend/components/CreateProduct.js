import useFormInput from '../hooks/useFormInput';
import Form from './styles/Form';

const CreateProduct = () => {
  const { inputs, onChange } = useFormInput({
    image: '',
    name: 'Tiago',
    price: 10,
    description: 'Nice picture',
  });

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(inputs);
        }}
      >
        <fieldset>
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
