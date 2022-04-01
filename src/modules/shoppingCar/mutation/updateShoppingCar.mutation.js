import { getShoppingCarRepository, updateShoppingCarRepository } from '../repository/shoppingCar.repository';
import { mongoose } from '@condor-labs/mongodb/src/mongodb';
import { getProductRepository } from '../../product/repository/product.repository';

const updateShoppingCar = async (id, products) => {
  try {
    products.map((element) => {
      element.productId = mongoose.Types.ObjectId(element.productId);
      return element;
    });

    const totality = await calculatePrice(products);
    await updateShoppingCarRepository(id, products, totality);

    const response = await getShoppingCarRepository({ _id: id });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const calculatePrice = (products) => {
  let totality = 0;
  let countSum = 0;
  const promise = new Promise((resolve, reject) => {
    products.forEach(async (element) => {
      const productFind = await getProductRepository({ _id: element.productId });

      if (productFind) {
        const multiplication = element.quantity * productFind.price;
        totality = totality + multiplication;
      } else {
        reject('error product not found wrong');
      }
      countSum = countSum + 1;

      if (products.length === countSum) {
        resolve(totality);
      }
    });
  });
  return promise;
};

const updateShoppingCarMutation = {
  updateShoppingCar: async (_, { id, products }) => await updateShoppingCar(id, products),
};

export default updateShoppingCarMutation;
