import { KeystoneContext } from '@keystone-next/types';
import {
  CardItemCreateInput,
  CardItemUpdateInput,
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

  // 4. Convert the cardItems to orderItems
  const orderItems = cartItems.map((cartItem: CardItemUpdateInput) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });

  // 5. Create the order and return it
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      items: { create: orderItems },
      user: { connect: { id: userId } },
      charge: charge.id,
    },
    resolveFields: false,
  });

  // 6. Clean the cart after all is done
  const cartItemIds = cartItems.map((cartItem) => cartItem.id);
  await context.lists.CardItem.deleteMany({
    ids: cartItemIds,
  });

  return order;
}

export default checkout;
