import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useFormInput from '../hooks/useFormInput';
import { CURRENT_USER_QUERY } from '../hooks/useUser';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const SIGNIN_USER_MUTATION = gql`
  mutation SIGNIN_USER_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
        code
      }
    }
  }
`;

const SingIn = () => {
  const { inputs, clearForm, onChange } = useFormInput({
    email: '',
    password: '',
  });
  const [signin, { data, loading, error }] = useMutation(SIGNIN_USER_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signin();
    clearForm();
  }

  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sing in to your account</h2>
      <ErrorMessage
        error={{ message: data?.authenticateUserWithPassword?.message }}
      />
      <fieldset aria-disabled={loading} disabled={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
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
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default SingIn;
