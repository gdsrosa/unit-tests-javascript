import find from 'lodash/find';
import remove from 'lodash/remove';
import Money from 'dinero.js';

import { calculateDiscount, calculatePercentageDiscount } from './discount.utils';

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export default class Cart {
  items = [];

  addItem(item) {
    const itemToFind = { product: item.product };

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }
    this.items.push(item);
  }

  removeItem(product) {
    remove(this.items, { product });
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }

  summary() {
    const total = this.getTotal();
    const formattedTotal = total.toFormat('$0,0.00');
    const items = this.items;

    return {
      formattedTotal,
      total: total.getAmount(),
      items,
    };
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      const { quantity, condition, product } = item;

      const amount = Money({ amount: quantity * product.price });
      let discount = calculatePercentageDiscount(item, amount);

      if (condition) {
        discount = calculateDiscount(amount, quantity, condition);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }
}
