import { getShoppingCarRepository, updateShoppingCarRepository } from '../repository/shoppingCar.repository';
import { mongoose } from '@condor-labs/mongodb/src/mongodb';
import { getProductRepository } from '../../product/repository/product.repository';

const updateShoppingCar = async (id, products) => {
  products.map((element) => {
    element.productId = mongoose.Types.ObjectId(element.productId);
    return element;
  });

  const totality = await calculatePrice(products);
  await updateShoppingCarRepository(id, products, totality);

  const response = await getShoppingCarRepository({ _id: id });
  return response;
};

const calculatePrice = (products) => {
  let totality = 0;
  let countSum = 0;
  const promise = new Promise((resolve, reject) => {
    try {
      products.forEach(async (element) => {
        const { price } = await getProductRepository({ _id: element.productId });
        const multiplication = element.quantity * price;
        totality = totality + multiplication;
        countSum = countSum + 1;
        if (products.length === countSum) {
          resolve(totality);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};

const updateShoppingCarMutation = {
  updateShoppingCar: async (_, { id, products }) => await updateShoppingCar(id, products),
};

export default updateShoppingCarMutation;
