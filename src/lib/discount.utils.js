import Money from 'dinero.js';

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

const calculatePercentageDiscount = (item, amount) => {
  const { condition, quantity } = item;
  let discount = Money({ amount: 0 });

  if (condition?.percentage && quantity > condition.minimum) {
    discount = amount.percentage(condition.percentage);
  }
  return discount;
};

const calculateQuantityDiscount = (item, amount) => {
  const { condition, quantity } = item;
  const isEven = quantity % 2 === 0;
  let discount = Money({ amount: 0 });

  if (condition?.quantity && quantity > condition.quantity) {
    discount = amount.percentage(isEven ? 50 : 40);
  }

  return discount;
};

const calculateDiscount = (amount, quantity, condition) => {
  const conditionList = Array.isArray(condition) ? condition : [condition];
  const [higherDiscount] = conditionList
    .map(cond => {
      if (cond.percentage) {
        return calculatePercentageDiscount({ condition: cond, quantity }, amount).getAmount();
      } else if (cond.quantity) {
        return calculateQuantityDiscount({ condition: cond, quantity }, amount).getAmount();
      }
    })
    .sort((a, b) => b - a);

  return Money({ amount: higherDiscount });
};

export { calculatePercentageDiscount, calculateDiscount };
