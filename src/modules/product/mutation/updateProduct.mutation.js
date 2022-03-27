import { getProductRepository, updateProductRepository } from "../repository/product.repository";


const updateProduct = async (id,product) => {
  await updateProductRepository(id,product)
  return await getProductRepository({ _id:id })

}

const updateProductMutation = {
    updateProduct: async (_, {id, input }) => await updateProduct(id,input),
};

export default updateProductMutation