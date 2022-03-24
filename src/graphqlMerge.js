import productQuerys from './modules/product/query';
import productMutations from './modules/product/mutation' 
import typeDefProduct from './modules/product/productTypedf';


const resolvers = () => {
  return {
    Query: {
      ...productQuerys
    },
    Mutation: {
      ...productMutations
    },
  };
};

const optionsMerge = {
    typeDefs: [typeDefProduct],
    resolvers: resolvers(),
}

export default optionsMerge