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

export default router;
