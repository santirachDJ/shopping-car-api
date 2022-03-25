import mongoDB from "@condor-labs/mongodb"
import mongoosePaginate from "mongoose-paginate-v2"

const mongoDbConnection = mongoDB()
const { Schema, model } = mongoDbConnection.mongoose;



const productSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: ['FOOD', 'TECH', 'TOYS'],
            require: true
        }
    },
    { timestamps: true }
);

productSchema.path('code').validate(async (value) => {
    const isExist = await model('Product').countDocuments({code: value });
    return !isExist;
  }, 'code already exists');
 
// Adding the pagination plugin
productSchema.plugin(mongoosePaginate);

export default model('Product', productSchema, 'Product');