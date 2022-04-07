import ShoppingCarModel from '../model/shoppingCar.model';

const addShoppingCarRepository = async (data) => {
  return await ShoppingCarModel.create(data);
};

const updateShoppingCarRepository = async (id, products, totality) => {
  return await ShoppingCarModel.updateOne(
    { _id: id },
    {
      $set: {
        totalPrice: totality,
        products: products,
      },
    }
  );
};

const getShoppingCarRepository = async (filter) => {
  return await ShoppingCarModel.findOne(filter).exec();
};

const addProductToShoppingCarRepository = async (id, product) => {
  return await ShoppingCarModel.findOneAndUpdate(
    { _id: id },
    { $addToSet: { products: { productId: product.productId, quantity: product.quantity } } }
  );
};

const removeProductToShoppingCarRepository = async (id, productId) => {
  return await ShoppingCarModel.findOneAndUpdate({ _id: id }, { $pull: { products: productId } }, { multi: true });
};
export {
  addShoppingCarRepository,
  updateShoppingCarRepository,
  getShoppingCarRepository,
  addProductToShoppingCarRepository,
  removeProductToShoppingCarRepository,
};
