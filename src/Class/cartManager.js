import fs from 'node:fs';

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

  async addProductToCart(cid, pid) {
    // obtengo lista de carros
    this.carts = await this.getCarts();

    // agrego nuevo producto al array de productos
    const cartsUpdated = this.carts.map((cart) => {
      if (cart.id !== cid) return cart;

      const indexProduct = cart.products.findIndex(
        (product) => product.id === pid,
      );
      if (indexProduct === -1) {
        cart.products.push({ id: pid, quantity: 1 });
        return cart;
      }
      cart.products[indexProduct] = {
        ...cart.products[indexProduct],
        quantity: cart.products[indexProduct].quantity + 1,
      };
      return cart;
    });
    this.carts = [...cartsUpdated];
    await fs.promises.writeFile(
      this.path,
      JSON.stringify({ data: this.carts }),
    );
  }
}

export default CartManager;
