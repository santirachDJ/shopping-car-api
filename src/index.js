
import app from "./app";
import optionsMerge from "./graphqlMerge";
import startApolloServer from "./bootstrap/graphql.bootstrap";
import startExpressServer from "./bootstrap/server.bootstrap";
import {initialize,disconnect} from "./bootstrap/mongoDB.bootstrap";


const startServer = async ()=>{
    try {
        await initialize()
        await startApolloServer(app,optionsMerge.typeDefs,optionsMerge.resolvers)
        await startExpressServer(app) 
    } catch (error) {
        await disconnect()
        console.log('error al iniciar servidores en startServer',error)
    }
}

startServer()






 