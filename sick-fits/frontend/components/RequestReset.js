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

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <ErrorMessage error={error} />
      {data?.sendUserPasswordResetLink === null && (
        <p>You should have receive and email!</p>
      )}
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
