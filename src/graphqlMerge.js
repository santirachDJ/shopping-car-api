import productGraphqlOptions from "./modules/product";


const resolvers = () => {
  return {
    Query: {
      ...productGraphqlOptions.query
    },
    Mutation: {
      ...productGraphqlOptions.mutation
    },
  };
};

const optionsMerge = {
    typeDefs: [productGraphqlOptions.typdef],
    resolvers: resolvers(),
}

export default optionsMerge