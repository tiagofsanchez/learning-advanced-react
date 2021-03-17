export default function calcTotalPrice(cartArray) {
  return (
    cartArray &&
    cartArray.reduce((tally, cartItem) => {
      if (!cartItem?.product) return tally;
      return tally + cartItem.quantity * cartItem.product.price;
    }, 0)
  );
}
