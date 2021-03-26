import { KeystoneContext } from '@keystone-next/types';
import {
  CardItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

// this is a great way to have syntax highlight
const graphql = String.raw;

async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Make sure they are signed in
  const userId = context.session.itemId as Session;
  if (!userId) {
    throw new Error('You must be logged in to do this');
  }

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name 
      email 
      cart { 
          id 
          quantity
          product { 
            id
            name 
            price
            description
            photo { 
              id 
              image { 
                id 
                publicUrlTransformed
              }
            }
          }
      }
    `,
  });

  // console.dir(user, { depth: null });

  // 2. Calculate the total price for the order
  const cartItems = user.cart.filter((cart) => cart.product);
  const amount = cartItems.reduce(function (
    tally: number,
    cartItem: CardItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.product.price;
  },
  0);
  console.log(amount);

  // 3. Create the payment with stripe lib
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  // 4. Convert the cardItems to OrderItems
  // 5. Create the order and return it
}

export default checkout;
