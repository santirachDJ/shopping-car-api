import { translateErrors } from '../../../errors/translateErrors.errors';
import { calculatePrice } from '../../../helpers/utilities.helpers';
import { getShoppingCarRepository, updateShoppingCarRepository } from '../repository/shoppingCar.repository';

const addProductToShoppingCar = async (id, product) => {
  console.log('id', id);
  console.log('product', product);
  const findShopping = await getShoppingCarRepository({ _id: id });
  const newProducts = findShopping.products.filter((prudctClone) => {
    return prudctClone.productId !== product.productId;
  });
  newProducts.push(product);
  const totality = await calculatePrice(newProducts);

  await updateShoppingCarRepository(id, newProducts, totality);
  /* await addProductToShoppingCarRepository(id, { productId: product.productId, quantity: product.quantity });*/
  const response = await getShoppingCarRepository({ _id: id });
  return response;
};

const addProductToShoppingCarMutation = {
  addProductToShoppingCar: translateErrors(async (_, { id, product }) => await addProductToShoppingCar(id, product)),
};

export default addProductToShoppingCarMutation;
