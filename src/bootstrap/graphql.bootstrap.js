import { ApolloServer } from 'apollo-server-express';

const startApolloServer = (app, typeDefs, resolvers) => {
  const promiseApolloServer = new Promise((resolve, reject) => {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    apolloServer
      .start()
      .then(() => {
        apolloServer.applyMiddleware({ app, path: '/graphql' });
        console.log('ApolloServer corriendo');
        resolve();
      })
      .catch((error) => {
        console.log('No se pudo iniciar apolloServer', error);
        reject();
      });
  });
  return promiseApolloServer;
};

export default startApolloServer;
