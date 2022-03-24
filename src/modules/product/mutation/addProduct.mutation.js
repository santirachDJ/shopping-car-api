

async function addProduct(product) {
  console.log(product)
  return product
  
}

const addProductMutation = {
    addProduct: async (_, { input }) => await addProduct(input),
};

export default addProductMutation