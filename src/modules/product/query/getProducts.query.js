import { getFilterSearch, getFilterSort } from "../../../helpers/query.helpers"
import { getProductsRepository } from "../repository/product.repository"

const getProducts = async (search, pagination = { limit: 25, offset: 0 }) => {
    const { sort, ...searchFilters } = search || {}
    const { limit, offset } = pagination
    const filterToSort = sort ? getFilterSort(sort) : ""
    getFilterSearch(searchFilters)
    const response = await getProductsRepository(searchFilters, limit, offset, filterToSort)
    return response
}

const getProductsQuery = {
    getProducts: async (_, { search, pagination }) => await getProducts(search, pagination),
};

export default getProductsQuery
