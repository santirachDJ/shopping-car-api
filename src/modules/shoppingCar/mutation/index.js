import addProductToShoppingCarMutation from './addProductToShopping.mutation';
import addShoppingCarMutation from './addShoppingCar.mutation';
import updateShoppingCarMutation from './updateShoppingCar.mutation';

const shoppingCarMutations = {
  ...addShoppingCarMutation,
  ...updateShoppingCarMutation,
  ...addProductToShoppingCarMutation,
};

export default shoppingCarMutations;
