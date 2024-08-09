import fs from 'node:fs';
import { ProductModel } from '../model/product.model.js';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async getProducts() {
    try {
      const dataProducts = await fs.promises.readFile(this.path, 'utf-8');
      this.products = [...JSON.parse(dataProducts).data];
      return [...this.products];
    } catch (error) {
      throw error;
    }
  }

  async addProduct(product) {
    console.log(product);
    try {
      // Validar campos requeridos
      const requiredFields = [
        'title',
        'description',
        'code',
        'price',
        'status',
        'stock',
        'category',
      ];

      for (const field of requiredFields) {
        if (!product[field]) {
          throw new Error(`${field} is required`);
        }
      }

      const result = await ProductModel.create({ ...product });

      // Obtener productos existentes
      let productsList = await this.getProducts();

      // Le agrego el id al producto
      product.id = productsList.length + 1;

      // Agrego nuevo producto a mi BD
      this.products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify({ data: this.products }));
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      let foundProduct = products.find((product) => product.id === id);
      if (!foundProduct) {
        throw new Error(`Not product with id ${id}`);
      }
      return foundProduct;
    } catch (error) {
      throw error;
    }
  }

  updateProduct = async (id, updatedProduct) => {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);

      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct, id };
        await fs.promises.writeFile(this.path, JSON.stringify({ data: products }));
        return products[index];
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw error;
    }
  };

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === id);
      if (!product) {
        throw new Error(`no product with id ${id}`);
      }
      let filterProducts = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify({ data: filterProducts }));
      return filterProducts;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductManager;
