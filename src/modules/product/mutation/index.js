import addProductMutation from "./addProduct.mutation";
import updateProductMutation from "./updateProduct.mutation";


const productMutations = {
    ...addProductMutation,
    ...updateProductMutation
}
export default productMutations