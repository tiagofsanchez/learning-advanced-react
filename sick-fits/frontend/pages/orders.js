import styled from 'styled-components';
import Link from 'next/link';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import { useUser } from '../hooks/useUser';

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 20px;
`;

const OrdersPage = () => {
  const me = useUser();
  return (
    <div>
      <h2>You have {me?.orders.length} orders!</h2>
      <OrderUl>
        {me?.orders?.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <div className="order-meta">
                <p>{order.id}</p>
              </div>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};
export default OrdersPage;
