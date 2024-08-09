import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  title: String,
  stock: Number,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  category: String,
});

export const ProductModel = model('cart', productSchema);
