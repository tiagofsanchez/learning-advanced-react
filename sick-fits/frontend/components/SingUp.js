import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useFormInput from '../hooks/useFormInput';
import { CURRENT_USER_QUERY } from '../hooks/useUser';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const SIGNUP_USER_MUTATION = gql`
  mutation SIGNUP_USER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      password_is_set
      email
    }
  }
`;

const SingUp = () => {
  const { inputs, clearForm, onChange } = useFormInput({
    name: '',
    email: '',
    password: '',
  });
  const [signUp, { data, loading, error }] = useMutation(SIGNUP_USER_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signUp().catch(console.error);
    clearForm();
  }

  if (loading) return <p>Loading...</p>;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <fieldset aria-disabled={loading} disabled={loading}>
        <h2>Sing up for a new account</h2>
        {data?.createUser && (
          <p>
            Welcome! Now you just need to sing in with {data?.createUser.email}
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="name"
            name="name"
            id="nameUp"
            placeholder="your name"
            autoComplete="name"
            value={inputs.name}
            onChange={onChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="emailUp"
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
            id="passwordUp"
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

export default SingUp;
