import { useState } from 'react';

const useFormInput = (initValue) => {
  const [value, setValue] = useState(initValue);
  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: onChangeHandler,
  };
};

const CreateProduct = () => {
  const name = useFormInput('tiago');
  return (
    <form>
      <label htmlFor="name">
        Name
        <input type="text" name="name" id="name" placeholder="Name" {...name} />
      </label>
    </form>
  );
};
export default CreateProduct;
