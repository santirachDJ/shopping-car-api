import mongoDB from "@condor-labs/mongodb"

const mongoDbConnection = mongoDB()
const { Schema, model } = mongoDbConnection.mongoose;


const productSchema = new Schema({
    productId: { type: Schema.ObjectId },
    quantity: { type: Number }
});

const shoppingCarSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        totalPrice: {
            type: String
        },
        products: [productSchema]
    },
    { timestamps: true }
);



shoppingCarSchema.path('code').validate(async (value) => {
    const isExist = await model('ShoppingCar').countDocuments({ code: value });
    return !isExist;
}, 'code already exists');

shoppingCarSchema.pre('save', function (next) {
    let shopping = this
    if (!shopping.totalPrice) {
        shopping.totalPrice = 0
    }
    next()
});


export default model('ShoppingCar', shoppingCarSchema, 'ShoppingCar');