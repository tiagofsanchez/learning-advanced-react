import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../hooks/useUser';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = () => {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const signOutHandler = () => {
    signOut();
    console.log('Sign OUT');
  };
  return (
    <button type="button" onClick={signOutHandler}>
      Sign out
    </button>
  );
};

export default SignOut;
