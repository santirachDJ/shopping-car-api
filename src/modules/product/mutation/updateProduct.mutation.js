import { updateProductRepository } from "../repository/product.repository";


const updateProduct = async (id,product) => {
  await updateProductRepository(id,product)
  //consultar el obtener el getProduct
  return product
  
}

const updateProductMutation = {
    updateProduct: async (_, {id, input }) => await updateProduct(id,input),
};

export default updateProductMutation