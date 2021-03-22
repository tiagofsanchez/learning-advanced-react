/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useUser } from '../hooks/useUser';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../hooks/cartState';
import CloseButton from './styles/CloseButton';
import DeleteFromCart from './deleteFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ item }) => {
  const { product } = item;
  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * item.quantity)} -{' '}
          <em>
            {item.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <DeleteFromCart id={item.id} />
    </CartItemStyles>
  );
};

const Cart = () => {
  const me = useUser();
  const data = useCart();
  return (
    <CartStyles open={data.cartOpen}>
      <header>
        <Supreme>{me?.name}'s cart</Supreme>
      </header>
      <CloseButton onClick={data.closeCart} type="button">
        &times;
      </CloseButton>
      <ul>
        {me?.cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me?.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
