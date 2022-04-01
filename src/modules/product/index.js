import productQuerys from './query';
import productMutations from './mutation';
import productTypeDef from './typeDef/product.typeDef';

const productGraphqlOptions = {
  mutation: productMutations,
  query: productQuerys,
  typdef: productTypeDef,
};

export default productGraphqlOptions;
