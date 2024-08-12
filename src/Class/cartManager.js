import fs from 'node:fs';
import ProductManager from './ProductManager.js';
import { __dirname } from '../utils.js';
import { CartModel } from '../model/cart.model.js';
import { ProductModel } from '../model/product.model.js';
import mongoose from 'mongoose';

const productManager = new ProductManager(__dirname + '/data/products.json');

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async getCarts() {
    try {
      const dataCarts = await fs.promises.readFile(this.path, 'utf-8');
      this.carts = [...JSON.parse(dataCarts).data];
      return [...this.carts];
    } catch (error) {
      throw error;
    }
  }

  // this.carts = await this.getCarts();
  // let foundCart = this.carts.find((cart) => cart.id === cid);
  // return foundCart;

  async getCartById(cid) {
    try {
      let foundCart = await CartModel.findById({ _id: cid }).populate('products.products');
      return foundCart;
    } catch (error) {
      throw error;
    }
  }

  async createCart(products) {
    try {
      const cartCreated = await CartModel.create({});
      products.forEach((product) => cartCreated.products.push(product));
      cartCreated.save();
      return cartCreated;
    } catch (err) {
      return err.message;
    }
    // try {
    //   await this.getCarts();
    //   const newCart = { id: this.carts.length + 1, products: [] };
    //   this.carts.push(newCart);
    //   await fs.promises.writeFile(this.path, JSON.stringify({ data: this.carts }));
    //   return newCart;
    // } catch (error) {
    //   throw error;
    // }
  }

  async addProductToCart(cid, productFromBody) {
    try {
      const cart = await CartModel.findOne({ _id: cid });
      const findProduct = cart.products.some(
        (product) => product._id.toString() === productFromBody._id,
      );

      if (findProduct) {
        await CartModel.updateOne(
          { _id: cid, 'products._id': productFromBody._id },
          { $inc: { 'products.$.quantity': productFromBody.quantity } },
        );
        return await CartModel.findOne({ _id: cid });
      }

      await CartModel.updateOne(
        { _id: cid },
        {
          $push: {
            products: {
              _id: productFromBody._id,
              quantity: productFromBody.quantity,
            },
          },
        },
      );
      return await CartModel.findOne({ _id: cid });
    } catch (err) {
      console.log(err.message);
      return err;
    }

    // try {
    //   const products = await productManager.getProducts();
    //   if (products.some((product) => product.id === pid)) {
    //     const carts = await this.getCarts();

    //     // si existe el carrito le agrego un producto
    //     if (carts.some((cart) => cart.id === cid)) {
    //       let cart = carts.find((cart) => cart.id === cid);
    //       const indexProduct = cart.products.findIndex((product) => product.id === pid);
    //       const indexCart = carts.findIndex((cart) => cart.id === cid);

    //       if (indexProduct !== -1) cart.products[indexProduct].quantity++;
    //       else cart.products.push({ id: pid, quantity: 1 });

    //       //actualizo carrito
    //       carts[indexCart] = cart;

    //       //actualizo array de carritos
    //       await fs.promises.writeFile(this.path, JSON.stringify({ data: this.carts }));
    //     } else {
    //       throw new Error(`no existe carrito con id: ${cid}`);
    //     }
    //   } else {
    //     throw new Error(`There is no product with id: ${pid}`);
    //   }
    // } catch (error) {
    //   throw error;
    // }
  }

  async deleteProductInCart(cid, products) {
    try {
      return await CartModel.findOneAndUpdate({ _id: cid }, { products }, { new: true });
    } catch (err) {
      return err;
    }
  }
}

export default CartManager;
