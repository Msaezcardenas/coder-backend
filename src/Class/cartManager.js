import fs from 'node:fs';
import ProductManager from './ProductManager.js';
import { __dirname } from '../utils.js';

const productManager = new ProductManager(__dirname + '/data/products.json');

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async getCarts() {
    // obtener carros
    const dataCarts = await fs.promises.readFile(this.path, 'utf-8');
    this.carts = [...JSON.parse(dataCarts).data];
    return [...this.carts];
  }

  async getCartById(cid) {
    this.carts = await this.getCarts();
    let foundCart = this.carts.find((cart) => cart.id === cid);
    return foundCart;
  }

  async createCart() {
    try {
      await this.getCarts();
      const newCart = { id: this.carts.length + 1, products: [] };
      this.carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify({ data: this.carts }));
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const products = await productManager.getProducts();
      if (products.some((product) => product.id === pid)) {
        const carts = await this.getCarts();

        // si existe el carrito le agrego un producto
        if (carts.some((cart) => cart.id === cid)) {
          let cart = carts.find((cart) => cart.id === cid);
          const indexProduct = cart.products.findIndex((product) => product.id === pid);
          const indexCart = carts.findIndex((cart) => cart.id === cid);

          if (indexProduct !== -1) cart.products[indexProduct].quantity++;
          else cart.products.push({ id: pid, quantity: 1 });

          //actualizo carrito
          carts[indexCart] = cart;

          //actualizo array de carritos
          await fs.promises.writeFile(this.path, JSON.stringify({ data: this.carts }));
        } else {
          throw new Error(`no existe carrito con id: ${cid}`);
        }
      } else {
        throw new Error(`There is no product with id: ${pid}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default CartManager;
