import shoppingCarMutations from "./mutation"
import shoppingCarTypeDef from "./typeDef/shoppingCar.typeDef"


const shoppingCarGraphqlOptions = {
    mutation:shoppingCarMutations,
    query:{},
    typdef:shoppingCarTypeDef
}

export default shoppingCarGraphqlOptions