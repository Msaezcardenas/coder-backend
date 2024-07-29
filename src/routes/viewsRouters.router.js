import { Router } from 'express';

const app = Router();

app.get('/products', async (req, res) => {
  res.render('products');
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

export default app;
