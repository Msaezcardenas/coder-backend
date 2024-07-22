import { Router } from 'express';
import ProductManager from '../Class/ProductManager.js';
import { __dirname } from '../utils.js';

const app = Router();
const productManager = new ProductManager(__dirname + '/data/products.json');

const productList = await productManager.getProducts();

app.get('/products', async (req, res) => {
  console.log(productList);
  res.render('index', {
    productList,
  });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

export default app;
