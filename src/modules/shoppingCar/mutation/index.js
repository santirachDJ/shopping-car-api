import addShoppingCarMutation from './addShoppingCar.mutation';
import updateShoppingCarMutation from './updateShoppingCar.mutation';

const shoppingCarMutations = {
  ...addShoppingCarMutation,
  ...updateShoppingCarMutation,
};

export default shoppingCarMutations;
