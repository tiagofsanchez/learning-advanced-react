import Link from 'next/link';
import NaveStyles from './styles/NavStyles';
import { useUser } from '../hooks/useUser';

const Nav = () => {
  const user = useUser();
  return (
    <NaveStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </>
      )}
      {!user && <Link href="/signin">Sing In</Link>}
    </NaveStyles>
  );
};

export default Nav;
