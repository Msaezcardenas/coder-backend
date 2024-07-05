import express from 'express';
import ProductsRoute from './routes/products.router.js';
import CartsRoute from './routes/carts.router.js';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/products/', ProductsRoute);
app.use('/api/carts/', CartsRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
