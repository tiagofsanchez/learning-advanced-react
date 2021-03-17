import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../hooks/useUser';
import Button from './styles/Button';

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
