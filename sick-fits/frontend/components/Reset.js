import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useFormInput from '../hooks/useFormInput';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token }) => {
  const { inputs, clearForm, onChange } = useFormInput({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await reset().catch(console.error);
    clearForm();
  }

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  console.log({ data, loading, error, successfulError });
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your password</h2>
      <ErrorMessage error={successfulError || error} />
      {data?.redeemUserPasswordResetToken === null && (
        <p>You have a new password!</p>
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
        <label htmlFor="Password ">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="password"
            value={inputs.password}
            onChange={onChange}
          />
        </label>
        <button type="submit">Reset Password!</button>
      </fieldset>
    </Form>
  );
};

export default Reset;
