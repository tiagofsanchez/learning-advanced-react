import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';

import OrderStyles from './styles/OrderStyles';
import formatMoney from '../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        price
        quantity
        description
        photo {
          altText
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderItems = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id },
  });

  const { order } = data;

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <p>Loading...</p>;
  return (
    <OrderStyles>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Order Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Items:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order?.items?.map((orderItem) => (
          <div className="order-item" key={orderItem.id}>
            <img
              width="200"
              src={orderItem.photo.image.publicUrlTransformed}
              alt={orderItem.photo.altText}
            />
            <div className="item-details">
              <h2>{orderItem.name}</h2>
              <p>Qty: {orderItem.quantity}</p>
              <p>Each: {formatMoney(orderItem.price)}</p>
              <p>
                SubTotal: {formatMoney(orderItem.price * orderItem.quantity)}
              </p>
              <p>{orderItem.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

export default OrderItems;
