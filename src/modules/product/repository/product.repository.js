import ProductModel from "../model/product.model"

const addProductRepository = async (data)=> {
    return await ProductModel.create(data);
  };

  const updateProductRepository = async(id,data)=>{
      return await ProductModel.updateOne(
          { _id: id },
          {
            $set: data
        })
  }

  const getProductsRepository = async(searchFilters,limit,offset,filterToSort)=>{
      return await ProductModel.find(searchFilters).skip(offset).limit(limit).sort(filterToSort)
  }

  const getProductRepository = async (filter) =>{
    return await ProductModel.findOne(filter);
  }
  

  export {
    addProductRepository,
    updateProductRepository,
    getProductsRepository,
    getProductRepository
  }