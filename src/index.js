import startApolloServer from "./bootstrap/graphql.bootstrap";
import startExpressServer from "./bootstrap/server.bootstrap";
import app from "./app";
import optionsMerge from "./graphqlMerge";

const typeDefs = optionsMerge.typeDefs

const resolvers = optionsMerge.resolvers

const startServer = async ()=>{
    try {
        await startApolloServer(app,typeDefs,resolvers)
        await startExpressServer(app) 
    } catch (error) {
        console.log('error al iniciar servidores en startServer',error)
    }
}

startServer()






 