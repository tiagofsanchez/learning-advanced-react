import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useFormInput from '../hooks/useFormInput';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { inputs, clearForm, onChange } = useFormInput({
    email: '',
  });
  const [resetPass, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await resetPass().catch(console.error);
    clearForm();
  }

  console.log({ data, error, loading, inputs });
  if (loading) return <p>Loading...</p>;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <h2>Request a Password Reset</h2>
      <fieldset aria-disabled={loading} disabled={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="emailReset"
            placeholder="your email"
            autoComplete="email"
            value={inputs.email}
            onChange={onChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
