import { getProductRepository } from '../../product/repository/product.repository';
import { getShoppingCarRepository } from '../repository/shoppingCar.repository';

const getShoppingCar = async (id) => {
  const findShopping = await getShoppingCarRepository({ _id: id });
  const newProducts = await getProductsInformation(findShopping.products);

  return {
    _id: findShopping._id,
    code: findShopping.code,
    products: newProducts,
    createdAt: findShopping.createdAt,
    updatedAt: findShopping.updatedAt,
    totalPrice: findShopping.totalPrice,
  };
};

const getProductsInformation = (products) => {
  const promiseAllInformation = new Promise((resolve) => {
    let count = 0;
    const newProducts = [];
    products.map(async (product) => {
      const productInformation = await getProductRepository({ _id: product.productId });
      const { _id, category, name, price, code } = productInformation;
      newProducts.push({
        _id,
        category,
        name,
        price,
        code,
        quantity: product.quantity,
        total: product.quantity * price,
      });
      count = count + 1;
      if (count === products.length) {
        resolve(newProducts);
      }
    });
  });

  return promiseAllInformation;
};

const getShoppingCarQuery = {
  getShoppingCar: async (_, { id }) => await getShoppingCar(id),
};

export default getShoppingCarQuery;
