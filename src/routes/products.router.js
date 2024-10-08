import { Router } from 'express';
import { __dirname } from '../utils.js';
import ProductManager from '../Class/ProductManager.js';
import { ProductModel } from '../model/product.model.js';

const router = Router();
const productManager = new ProductManager(__dirname + '/data/products.json');

router.get('/', async (req, res) => {
  try {
    const { limit = 2, page = 1, sort = '', ...query } = req.query;

    const sortedManager = {
      asc: 1,
      desc: -1,
    };

    const productos = await ProductModel.paginate(
      { ...query },
      {
        limit,
        page,
        ...(sort && { sort: { price: sortedManager[sort] } }),
        customLabels: { docs: 'payload' },
      },
    );

    res.json({
      ...productos,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Server Error' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    let pid = req.params.pid;
    const foundProduct = await ProductModel.findById({ _id: pid });
    // const foundProduct = await productManager.getProductById(pid);
    if (foundProduct) res.send(foundProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(result);
    await productManager.addProduct(req.body);
    res.status(201).json({ message: 'Producto creado' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
  res.json(updatedProduct);
});

router.delete('/:pid', async (req, res) => {
  let pid = req.params.pid;
  console.log({ pid });

  try {
    await productManager.deleteProduct(pid);
    res.status(200).json({ message: 'Product delete' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
