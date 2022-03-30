import { deleteRedis, getDataRedis } from '../../../bootstrap/redis.bootstrap';
import { getProductRepository, updateProductRepository } from '../repository/product.repository';

const updateProduct = async (id, product) => {
  const productCache = await getDataRedis(id);
  if (productCache) {
    deleteRedis(id);
  }
  await updateProductRepository(id, product);
  return await getProductRepository({ _id: id });
};

const updateProductMutation = {
  updateProduct: async (_, { id, input }) => await updateProduct(id, input),
};

export default updateProductMutation;
