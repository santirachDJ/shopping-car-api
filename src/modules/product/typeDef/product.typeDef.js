import { gql } from 'apollo-server-express';

const productTypeDef = gql`
  type Query {
    getProduct(id: String): Product
    getProducts(search: ProductByQuery, pagination: PaginationOptions): [Product]
  }

  type Mutation {
    addProduct(input: ProductInput): Product
    updateProduct(id: String, input: ProductInput): Product
  }

  enum CategoryOptions {
    FOOD
    TECH
    TOYS
  }

  type Product {
    code: String
    name: String
    price: Int
    category: CategoryOptions
  }

  input ProductByOne {
    id: String
    code: String
  }

  input ProductByQuery {
    code: String
    name: String
    price: Int
    category: CategoryOptions
    sort: String
  }

  input PaginationOptions {
    offset: Int
    limit: Int
  }

  input ProductInput {
    code: String!
    name: String!
    price: Int!
    category: CategoryOptions!
  }
`;

export default productTypeDef;
