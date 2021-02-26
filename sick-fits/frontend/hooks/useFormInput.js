import { useState } from 'react';

const useFormInput = (initObj = {}) => {
  const [inputs, setInputs] = useState(initObj);

  const onChangeHandler = (e) => {
    let { name, value, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => setInputs(initObj);

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  };

  return {
    inputs,
    onChange: onChangeHandler,
    resetForm,
    clearForm,
  };
};

export default useFormInput;
