import ProductModel from "../model/product.model"

const addProductRepository = async (data)=> {
    return await ProductModel.create(data);
  };
  

  export {
    addProductRepository
  }