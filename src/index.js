import startApolloServer from "./bootstrap/graphql.bootstrap";
import startExpressServer from "./bootstrap/server.bootstrap";
import app from "./app";

const typeDefs = `
type Query {
    hello: String
}`

const resolvers = {
    Query:{
        hello:()=> 'hola mundo'
    }
}

const startServer = async ()=>{
    try {
        await startApolloServer(app,typeDefs,resolvers)
        await startExpressServer(app) 
    } catch (error) {
        console.log('error al iniciar servidores en startServer',error)
    }
}

startServer()






 