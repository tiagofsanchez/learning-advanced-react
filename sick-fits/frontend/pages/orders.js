import styled from 'styled-components';
import Link from 'next/link';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import { useUser } from '../hooks/useUser';
import formatMoney from '../lib/formatMoney';
import IsUserSignIn from '../components/IsUserSignIn';

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 20px;
`;

const sumOfItems = (array) =>
  array.reduce((tally, item) => tally + item.quantity, 0);

const OrdersPage = () => {
  const me = useUser();
  return (
    <IsUserSignIn>
      <div>
        <h2>You have {me?.orders.length} orders!</h2>
        <OrderUl>
          {me?.orders?.map((order) => (
            <OrderItemStyles key={order.id}>
              <Link href={`/order/${order.id}`}>
                <a>
                  <div className="order-meta">
                    <p>
                      {order?.items?.length} Product
                      {order?.items?.length === 1 ? '' : 's'}{' '}
                    </p>
                    <p>{sumOfItems(order?.items)} Items</p>
                    <p>{formatMoney(order?.total)}</p>
                  </div>
                  <div className="images">
                    {order?.items.map((item) => (
                      <img
                        key={item.id}
                        src={item.photo?.image.publicUrlTransformed}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </a>
              </Link>
            </OrderItemStyles>
          ))}
        </OrderUl>
      </div>
    </IsUserSignIn>
  );
};
export default OrdersPage;
