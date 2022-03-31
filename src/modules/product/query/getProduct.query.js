import { getDataRedis, setRedis } from '../../../bootstrap/redis.bootstrap';
import { getProductRepository } from '../repository/product.repository';

const getProduct = async (code) => {
  const productCache = await getDataRedis(code);
  let productResponse = {};

  if (productCache) {
    productResponse = JSON.parse(productCache);
  } else {
    const product = await getProductRepository({ code: code });
    if (!product) {
      throw new Error('Product no found was wrong');
    }
    setRedis(code, JSON.stringify(product));
    productResponse = product;
  }

  return productResponse;
};

const getProductQuery = {
  getProduct: async (_, { code }) => await getProduct(code),
};

export default getProductQuery;
