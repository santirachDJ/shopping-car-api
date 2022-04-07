import mongoDB from '@condor-labs/mongodb';
import mongoosePaginate from 'mongoose-paginate-v2';

const mongoDbConnection = mongoDB();
const { Schema, model } = mongoDbConnection.mongoose;

const productSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate(value) {
        if (value === null) {
          throw new Error('Price can not be empty string, really ?');
        } else if (value < 0) {
          throw new Error('Price must be a positive number');
        }
      },
      set: (v) => (typeof v === 'number' && v > 0 ? v : ' price can not negative value'),
    },
    category: {
      type: String,
      enum: ['FOOD', 'TECH', 'TOYS'],
      require: true,
    },
  },
  { timestamps: true }
);

productSchema.path('code').validate(async (value) => {
  const isExist = await model('Product').countDocuments({ code: value });
  return !isExist;
}, 'code already exists');

productSchema.path('price').validate(async (value) => {
  const isNegative = value < 0;
  return !isNegative;
}, 'price can not be negative');

// Adding the pagination plugin
productSchema.plugin(mongoosePaginate);

export default model('Product', productSchema, 'Product');
