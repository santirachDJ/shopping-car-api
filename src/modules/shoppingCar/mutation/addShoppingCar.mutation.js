import { translateErrors } from '../../../errors/translateErrors.errors';
import { addShoppingCarRepository } from '../repository/shoppingCar.repository';

const addShoppingCar = async (shopping) => {
  const response = await addShoppingCarRepository(shopping);
  return response;
};

const addShoppingCarMutation = {
  addShoppingCar: translateErrors(async (_, { input }) => await addShoppingCar(input)),
};

export default addShoppingCarMutation;
