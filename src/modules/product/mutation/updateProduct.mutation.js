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
    new Error('Product no found was wrong');
    return false;
  }
  return true;
};

const updateProductMutation = {
  updateProduct: async (_, { id, input }) => await updateProduct(id, input),
};

export default updateProductMutation;
