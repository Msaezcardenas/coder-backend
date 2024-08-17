import { Router } from 'express';
import { ProductModel } from '../model/product.model.js';

const app = Router();

app.get('/products', async (req, res) => {
  console.log('entra aqui');

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

  //uso del metodo paginate
  try {
    console.log('entra a try');
    const result = await ProductModel.paginate({}, options);
    console.log(result.docs);
    result.title = 'Api-Coder';
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

export default app;
