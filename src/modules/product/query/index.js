import getProductQuery from "./getProduct.query" 
import getProductsQuery from "./getProducts.query"

const productQuerys = {
    ...getProductQuery,
    ...getProductsQuery
}
export default productQuerys