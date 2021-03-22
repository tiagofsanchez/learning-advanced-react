import Link from 'next/link';
import NaveStyles from './styles/NavStyles';
import { useUser } from '../hooks/useUser';
import SignOut from './SingOut';
import { useCart } from '../hooks/cartState';
import Button from './styles/Button';
import CartCount from './cartCount';

const totalItems = (cart) => cart.reduce((acc, item) => acc + item.quantity, 0);

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NaveStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <Button type="button" onClick={openCart}>
            My Cart
            <CartCount count={totalItems(user.cart)} />
          </Button>
        </>
      )}
      {!user && <Link href="/signin">Sing In</Link>}
    </NaveStyles>
  );
};

export default Nav;
