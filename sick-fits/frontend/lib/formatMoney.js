// INTL format in javascript

export default function formatMoney(money = 0) {
  const options = {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 2,
  };

  if (money % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(money / 100);
}
