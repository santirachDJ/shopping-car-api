import { deleteRedis, getDataRedis } from '../../../bootstrap/redis.bootstrap';
import { getProductRepository, updateProductRepository } from '../repository/product.repository';

const updateProduct = async (id, product) => {
  const productCache = await getDataRedis(id);
  if (productCache) {
    deleteRedis(id);
  }
  const producFind = await getProductRepository({ _id: id });
  if (producFind) {
    await updateProductRepository(id, product);
  } else {
    throw new Error('Product no found was wrong');
  }
  return producFind;
};

const updateProductMutation = {
  updateProduct: async (_, { id, input }) => await updateProduct(id, input),
};

export default updateProductMutation;
