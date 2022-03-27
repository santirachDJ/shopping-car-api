import { getProductRepository } from "../repository/product.repository";

const getProduct = async (id) => {
    return await getProductRepository({ _id:id })
}

const getProductQuery = {
    getProduct: async (_, { id }) => await getProduct(id),
};

export default getProductQuery
