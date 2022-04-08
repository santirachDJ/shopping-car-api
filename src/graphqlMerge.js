import productGraphqlOptions from './modules/product';
import shoppingCarGraphqlOptions from './modules/shoppingCar';

const resolvers = () => {
  return {
    Query: {
      ...productGraphqlOptions.query,
      ...shoppingCarGraphqlOptions.query,
    },
    Mutation: {
      ...productGraphqlOptions.mutation,
      ...shoppingCarGraphqlOptions.mutation,
    },
  };
};

const optionsMerge = {
  typeDefs: [productGraphqlOptions.typdef, shoppingCarGraphqlOptions.typdef],
  resolvers: resolvers(),
};

export default optionsMerge;
