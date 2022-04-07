import mongoDB from '@condor-labs/mongodb';

const mongoDbConnection = mongoDB();
const { Schema, model } = mongoDbConnection.mongoose;

const shoppingCarSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      validate: async (value) => {
        const isExist = await model('ShoppingCar').countDocuments({ code: value });
        if (isExist) {
          throw new Error('already exists');
        }
      },
    },
    totalPrice: {
      type: String,
    },
    products: [
      {
        productId: { type: Schema.ObjectId },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

shoppingCarSchema.pre('save', function (next) {
  const shopping = this;
  if (!shopping.totalPrice) {
    shopping.totalPrice = 0;
  }
  next();
});

export default model('ShoppingCar', shoppingCarSchema, 'ShoppingCar');
