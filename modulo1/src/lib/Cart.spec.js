import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    price: 35388,
    name: 'Adizero Running t-shirt - men',
  };

  let otherProduct = {
    price: 41872,
    name: 'Adizero Running t-shirt - women',
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when the getTotal method is called from a brand new Cart', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };
      const total = item.product.price * item.quantity;

      cart.addItem(item);

      expect(cart.getTotal().getAmount()).toEqual(total);
    });

    it('should ensure no more than a product exists at a time', () => {
      cart.addItem({
        product,
        quantity: 2,
      });

      cart.addItem({
        product,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.addItem({
        product,
        quantity: 2,
      });

      cart.addItem({
        product: otherProduct,
        quantity: 1,
      });

      cart.removeItem(product);

      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe('checkout()', () => {
    it('should return an object with total and a list of items', () => {
      const result = {
        items: [
          { product: { name: 'Adizero Running t-shirt - men', price: 35388 }, quantity: 2 },
          { product: { name: 'Adizero Running t-shirt - women', price: 41872 }, quantity: 3 },
        ],
        total: 196392,
      };

      cart.addItem({
        product,
        quantity: 2,
      });

      cart.addItem({
        product: otherProduct,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot(result);
    });

    it('should reset the cart when checkout() is called', () => {
      cart.addItem({
        product,
        quantity: 2,
      });
      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('summary()', () => {
    it('should return all items from the cart when summary() is called', () => {
      cart.addItem({
        product,
        quantity: 2,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should include formatted amount in the summary', () => {
      cart.addItem({
        product,
        quantity: 5,
      });

      cart.addItem({
        product: otherProduct,
        quantity: 3,
      });

      expect(cart.summary().formattedTotal).toEqual('R$3,025.56');
    });
  });

  describe('special conditions (discounts)', () => {
    it('should apply percentage discount when above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };
      cart.addItem({
        condition,
        product,
        quantity: 3,
      });
      expect(cart.getTotal().getAmount()).toEqual(74315);
    });
    it('should NOT apply percentage discount when is below or equals minimum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };
      cart.addItem({
        condition,
        product,
        quantity: 2,
      });
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should apply quantity discount only on even quantity', () => {
      const condition = {
        quantity: 2,
      };
      cart.addItem({
        condition,
        product,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      };
      cart.addItem({
        condition,
        product,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should receive two or more conditions and determine/apply which discount is better. First case', () => {
      const firstCondition = {
        percentage: 30,
        minimum: 2,
      };
      const secondCondition = {
        quantity: 2,
      };

      cart.addItem({
        product,
        condition: [firstCondition, secondCondition],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should receive two or more conditions and determine/apply which discount is better. Second case', () => {
      const firstCondition = {
        percentage: 80,
        minimum: 2,
      };
      const secondCondition = {
        quantity: 2,
      };

      cart.addItem({
        product,
        condition: [firstCondition, secondCondition],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
  });
});
