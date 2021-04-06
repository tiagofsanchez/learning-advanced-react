import { useUser } from '../hooks/useUser';
import SingIn from './SingIn';

const IsUserSignIn = ({ children }) => {
  const me = useUser();
  if (!me) return <SingIn />;
  return children;
};

export default IsUserSignIn;
