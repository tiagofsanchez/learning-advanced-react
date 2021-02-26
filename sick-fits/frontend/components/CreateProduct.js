import useFormInput from '../hooks/useFormInput';

const CreateProduct = () => {
  const { inputs, onChange, clearForm, resetForm } = useFormInput({
    name: 'Tiago',
    price: 10,
    description: 'Nice picture',
  });

  return (
    <>
      <form>
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
        <label htmlFor="name">
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
        <button type="button" onClick={clearForm}>
          Clear
        </button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>
    </>
  );
};
export default CreateProduct;
