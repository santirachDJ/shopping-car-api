import shoppingCarMutations from './mutation';
import shoppingCarQuerys from './query';
import shoppingCarTypeDef from './typeDef/shoppingCar.typeDef';

const shoppingCarGraphqlOptions = {
  mutation: shoppingCarMutations,
  query: shoppingCarQuerys,
  typdef: shoppingCarTypeDef,
};

export default shoppingCarGraphqlOptions;
