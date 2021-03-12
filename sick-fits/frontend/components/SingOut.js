import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../hooks/useUser';

// don't really understand why this happened in this button!
const Button = styled.button`
  background-color: transparent;
  border: none;
  font-family: ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--black);
  font-size: 2rem;
`;

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = () => {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <Button type="button" onClick={signOut}>
      Sign out
    </Button>
  );
};

export default SignOut;
