import { Router } from 'express';
import { __dirname } from '../utils.js';
import CartManager from '../Class/cartManager.js';
import { ProductModel } from '../model/product.model.js';
import { CartModel } from '../model/cart.model.js';

const cartsManager = new CartManager(__dirname + '/data/carts.json');
const router = Router();

router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  const cartFinded = await CartModel.findById(cid);
  if (!cartFinded) res.status(404).json({ message: 'error' });

  const indexProd = cartFinded.products.findIndex((prod) => prod.product.toString() === pid);
  if (indexProd === -1) {
    cartFinded.products.push({ product: pid, quantity: 1 });
  } else {
    cartFinded.products[indexProd] = {
      product: cartFinded.products[indexProd].product,
      quantity: cartFinded.products[indexProd].quantity + 1,
    };
  }
  const cartUpdated = await CartModel.findByIdAndUpdate(cid, cartFinded, {
    new: true,
  }).populate('products.product');

  res.status(201).json({ message: 'Product Added', cart: cartUpdated });
});

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate('products.product');
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('get desde cartrs');
    const carts = await cartsManager.getCarts();
    res.status(200).json({ data: carts });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCart = await CartModel.create({
      products: [],
    });
    res.status(201).json({ data: newCart });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  const cartFinded = await CartModel.findById(cid).lean();
  if (!cartFinded) res.status(404).json({ message: 'error' });

  console.log(cartFinded);

  const cartFiltered = {
    ...cartFinded,
    products: cartFinded.products.filter((prod) => prod._id !== pid),
  };

  const cartUpdated = await CartModel.findByIdAndUpdate(cid, cartFiltered, {
    new: true,
  }).populate('products.product');

  res.status(201).json({ message: 'Product deleted', cart: cartUpdated });
});

router.put('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cartFinded = await CartModel.findById(cid).lean();
  if (!cartFinded) res.status(404).json({ message: 'error' });

  const indexProd = cartFinded.products.findIndex((prod) => prod.product.toString() === pid);

  cartFinded.products[indexProd] = { ...cartFinded.products[indexProd], quantity };

  const cartUpdated = await CartModel.findByIdAndUpdate(cid, cartFinded, {
    new: true,
  }).populate('products.product');

  res.status(201).json({ message: 'Product Quantity Modify', cart: cartUpdated });
});

router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  const cartFinded = await CartModel.findById(cid).lean();
  if (!cartFinded) res.status(404).json({ message: 'error' });

  const newCart = {
    ...cartFinded,
    products,
  };
  const cartUpdated = await CartModel.findByIdAndUpdate(cid, newCart, {
    new: true,
  }).populate('products.product');

  res.status(201).json({ message: 'Products clean', cart: cartUpdated });
});

export default router;
