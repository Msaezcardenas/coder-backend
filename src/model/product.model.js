import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
  title: String,
  stock: Number,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  category: String,
});

productSchema.plugin(mongoosePaginate);
export const ProductModel = model('products', productSchema);
