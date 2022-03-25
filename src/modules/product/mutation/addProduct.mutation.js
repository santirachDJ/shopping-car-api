import { addProductRepository } from "../repository/product.repository";


const addProduct = async (product) => {
  const response = await addProductRepository(product)
  return response
  
}

const addProductMutation = {
    addProduct: async (_, { input }) => await addProduct(input),
};

export default addProductMutation