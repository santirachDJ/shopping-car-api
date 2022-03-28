import ShoppingCarModel from "../model/shoppingCar.model";

const addShoppingCarRepository = async (data) => {
  return await ShoppingCarModel.create(data);
};

const updateShoppingCarRepository = async (id,products,totality) => {
  return await ShoppingCarModel.updateOne(
    { _id: id },
    {
      $set: {
        totalPrice:totality,
        products: products
      }
    }
  )
}

const getShoppingCarRepository = async (filter) =>{
  return await ShoppingCarModel.findOne(filter);
}

export {
  addShoppingCarRepository,
  updateShoppingCarRepository,
  getShoppingCarRepository
}