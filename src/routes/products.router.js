import { Router } from 'express';
import { __dirname } from '../utils.js';
import ProductManager from '../Class/ProductManager.js';

const router = Router();
const productManager = new ProductManager(__dirname + '/data/products.json');

router.get('/', async (req, res) => {
  try {
    const productList = await productManager.getProducts();
    res.status(201).json({ data: productList });
  } catch (error) {
    res.status(400).json({ message: 'Server Error' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    let pid = parseInt(req.params.pid);
    const foundProduct = await productManager.getProductById(pid);
    if (foundProduct) res.send(foundProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await productManager.addProduct(req.body);
    res.status(201).json({ message: 'Producto creado' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.updateProduct(
    parseInt(req.params.pid),
    req.body,
  );
  res.json(updatedProduct);
});

router.delete('/:pid', async (req, res) => {
  let pid = parseInt(req.params.pid);
  try {
    await productManager.deleteProduct(pid);
    res.status(200).json({ message: 'Product delete' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
