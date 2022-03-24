
const getProduct = async (id) => {
    console.log("id", id)
    return {
        code: 1,
        name: "prueba",
        price: 100,
        category: "FOOD"
    }
}

const getProductQuery = {
    getProduct: async (_, { id }) => await getProduct(id),
};

export  default  getProductQuery
