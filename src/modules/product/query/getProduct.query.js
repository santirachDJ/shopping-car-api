
import { getDataRedis, setRedis } from "../../../bootstrap/redis.bootstrap";
import { getProductRepository } from "../repository/product.repository";

const getProduct = async (id) => {
    const productCache = await getDataRedis(id)
    if (productCache) {
        return JSON.parse(productCache)
    } else {
        const product = await getProductRepository({ _id: id })
        setRedis(id, JSON.stringify(product))
        return product
    }
}

const getProductQuery = {
    getProduct: async (_, { id }) => await getProduct(id),
};

export default getProductQuery
