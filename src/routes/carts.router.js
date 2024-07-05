import { Router } from 'express';
import { __dirname } from '../utils.js';
import CartManager from '../Class/cartManager.js';

const cartsManager = new CartManager(__dirname + '/data/carts.json');
const router = Router();

router.post('/:cid/products/:pid', async (req, res) => {
  let pid = parseInt(req.params.pid);
  let cid = parseInt(req.params.cid);
  try {
    await cartsManager.addProductToCart(cid, pid);
    res.status(201).json({ message: 'Producto agregado' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    let cid = parseInt(req.params.cid);
    const cart = await cartsManager.getCartById(cid);
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
