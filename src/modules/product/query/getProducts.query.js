import { isEmpty } from 'lodash';
import { getFilterSearch, getFilterSort } from '../../../helpers/query.helpers';
import { getAllProductCount, getProductsRepository } from '../repository/product.repository';

const getProducts = async (search, pagination = { limit: 25, offset: 0 }, sort) => {
  const { ...searchFilters } = search || {};
  const { limit, offset } = pagination;
  const filterToSort = sort ? getFilterSort(sort) : '';
  getFilterSearch(searchFilters);
  const response = await getProductsRepository(searchFilters, limit, offset, filterToSort);
  const coutnProducts = await getAllProductCount();
  return { items: response, size: isEmpty(searchFilters) ? coutnProducts : response.length };
};

const getProductsQuery = {
  getProducts: async (_, { search, pagination, sort }) => await getProducts(search, pagination, sort),
};

export default getProductsQuery;
