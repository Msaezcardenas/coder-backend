import { Router } from 'express';
import { ProductModel } from '../model/product.model.js';
import { CartModel } from '../model/cart.model.js';

const app = Router();

app.get('/products', async (req, res) => {
  let page = parseInt(req.query.page);
  if (!page) {
    page = 1;
  }
  const sortOption = req.query.sort;
  const options = {
    sort: sortOption === 'asc' ? { price: 1 } : sortOption === 'desc' ? { price: -1 } : {},
    page,
    limit: 2,
    lean: true,
  };

  try {
    const result = await ProductModel.paginate({}, options);

    result.title = 'Backend - 1';
    result.prevLink = result.hasPrevPage
      ? `http://localhost:8080/products?page=${result.prevPage}`
      : '';
    result.nextLink = result.hasNextPage
      ? `http://localhost:8080/products?page=${result.nextPage}`
      : '';
    result.isValid = !(page <= 0 || page > result.totalPages);

    res.render('products', result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener productos');
  }
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

app.get('/carts/:cid', async (req, res) => {
  const { cid } = req.params;
  console.log(`ID del carrito: ${cid}`);

  try {
    const cart = await CartModel.findById(cid).populate('products.product').lean();
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    } else {
      res.render('carts', { data: { ...cart.products } });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el carrito', error: error.message });
  }
});

export default app;
