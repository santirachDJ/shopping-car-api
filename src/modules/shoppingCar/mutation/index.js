import addProductToShoppingCarMutation from './addProductToShopping.mutation';
import addShoppingCarMutation from './addShoppingCar.mutation';
import deleteProductToShoppingCarMutation from './deleteProductToShoppingCar.mutation';
import updateShoppingCarMutation from './updateShoppingCar.mutation';

const shoppingCarMutations = {
  ...addShoppingCarMutation,
  ...updateShoppingCarMutation,
  ...addProductToShoppingCarMutation,
  ...deleteProductToShoppingCarMutation,
};

export default shoppingCarMutations;
