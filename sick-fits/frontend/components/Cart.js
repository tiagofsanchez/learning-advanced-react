import styled from 'styled-components';
import { useUser } from '../hooks/useUser';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';

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
    </CartItemStyles>
  );
};

const Cart = ({ open }) => {
  const me = useUser();
  console.log(me);
  return (
    <CartStyles open>
      <header>
        <Supreme>{me?.name}'s cart</Supreme>
      </header>
      <ul>
        {me?.cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </CartStyles>
  );
};

export default Cart;
