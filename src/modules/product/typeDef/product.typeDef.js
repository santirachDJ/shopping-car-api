import { gql } from "apollo-server-express";

const productTypeDef = gql`
 
 type Query {
    getProduct(id: String): Product
 }

 type Mutation {
    addProduct(input: ProductInput): Product
  }

type Product {
    code: String
    name: String
    price: String
    category: CategoryOptions
}

enum CategoryOptions {
    FOOD
    TECH
    TOYS
  }

 input ProductInput {
    code: String!
    name: String!
    price: String!
    category: CategoryOptions!
 }

`;

export default productTypeDef