import { ApolloError } from 'apollo-server-express';

export function translateErrors(func) {
  return async (...funcArgs) => {
    try {
      return await func(...funcArgs);
    } catch (error) {
      throw new ApolloError(error);
    }
  };
}
