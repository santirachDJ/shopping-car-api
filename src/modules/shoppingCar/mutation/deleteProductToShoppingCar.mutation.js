import { translateErrors } from '../../../errors/translateErrors.errors';
import { calculatePrice } from '../../../helpers/utilities.helpers';
import { getShoppingCarRepository, updateShoppingCarRepository } from '../repository/shoppingCar.repository';

const deleteProductToShoppingCar = async (id, productId) => {
  console.log('id', id);
  console.log('productId', productId);
  const findShopping = await getShoppingCarRepository({ _id: id });
  const newProducts = findShopping.products.filter((prudctClone) => {
    return prudctClone.productId.toString() !== productId.toString();
  });

  const totality = await calculatePrice(newProducts);
  console.log('newProducts', newProducts);
  await updateShoppingCarRepository(id, newProducts, totality);
  /* await addProductToShoppingCarRepository(id, { productId: product.productId, quantity: product.quantity });*/
  const response = await getShoppingCarRepository({ _id: id });
  console.log('response', response);
  return response;
};

const deleteProductToShoppingCarMutation = {
  deleteProductToShoppingCar: translateErrors(
    async (_, { id, productId }) => await deleteProductToShoppingCar(id, productId)
  ),
};

export default deleteProductToShoppingCarMutation;
