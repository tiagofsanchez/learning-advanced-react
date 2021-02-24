import Link from 'next/link';
import NaveStyles from './styles/NavStyles';

const Nav = () => (
  <NaveStyles>
    <Link href="/products">Products</Link>
    <Link href="/sell">Sell</Link>
    <Link href="/orders">Orders</Link>
    <Link href="/account">Account</Link>
  </NaveStyles>
);

export default Nav;
