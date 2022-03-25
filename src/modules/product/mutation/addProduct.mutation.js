import { addProductRepository } from "../repository/product.repository";


const addProduct = async (product) => {
  console.log(product)
  const response = await addProductRepository(product)
  console.log(response)
  return product
  
}

const addProductMutation = {
    addProduct: async (_, { input }) => await addProduct(input),
};

export default addProductMutation