import { gql } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});

const productTypeDef = gql`
  scalar Date

  type Query {
    getProduct(id: String): Product
    getProducts(search: ProductByQuery, pagination: PaginationOptions, sort: String): ProductsResponse
  }

  type Mutation {
    addProduct(input: ProductInput): Product
    updateProduct(id: String, input: ProductUpdateInput): Boolean
  }

  enum CategoryOptions {
    FOOD
    TECH
    TOYS
  }

  type ProductsResponse {
    size: Int
    items: [Product]
  }

  type Product {
    code: String
    name: String
    price: Int
    category: CategoryOptions
    _id: String
    createdAt: Date
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

  input ProductUpdateInput {
    code: String
    name: String
    price: Int
    category: CategoryOptions
  }
`;

export default productTypeDef;
