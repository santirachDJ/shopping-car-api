import { getProductRepository } from '../modules/product/repository/product.repository';

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

export { calculatePrice };
