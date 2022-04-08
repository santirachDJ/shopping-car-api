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

const shoppingCarTypeDef = gql`
  scalar Date

  type Query {
    getShoppingCar(id: String): ShoppingCardWhitProduct
  }

  type Mutation {
    addShoppingCar(input: ShoppingCarInput): ShoppingCar
    updateShoppingCar(id: String, products: [ProductShoppingInput]): ShoppingCar
    addProductToShoppingCar(id: String, product: ProductShoppingInput): ShoppingCar
    deleteProductToShoppingCar(id: String, productId: String): ShoppingCar
  }

  type ShoppingCardWhitProduct {
    code: String
    totalPrice: Int
    products: [ProductOnShopping]
    _id: String
  }

  type ProductOnShopping {
    code: String
    name: String
    price: Int
    category: CategoryOptions
    _id: String
    createdAt: Date
    quantity: Int
    total: Int
  }

  type ShoppingCar {
    code: String
    totalPrice: Int
    products: [ProductShopping]
    _id: String
  }

  type ProductShopping {
    productId: String
    quantity: Int
  }

  input ProductShoppingInput {
    productId: String
    quantity: Int
  }

  input ShoppingCarInput {
    code: String!
    totalPrice: String
    products: [ProductShoppingInput]
  }
`;

export default shoppingCarTypeDef;
