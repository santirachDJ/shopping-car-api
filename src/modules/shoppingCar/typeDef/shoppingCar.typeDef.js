import { gql } from "apollo-server-express";

const shoppingCarTypeDef = gql`
 
 
 type Mutation {
    addShoppingCar(input: ShoppingCarInput): ShoppingCar
    updateShoppingCar(id:String,products:[ProductShoppingInput]):ShoppingCar
  }


type ShoppingCar{
    code: String
    totalPrice: Int
    products:[ProductShopping]
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
    products:[ProductShoppingInput]
 }

`;

export default shoppingCarTypeDef