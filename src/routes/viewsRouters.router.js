import { Router } from 'express';

const app = Router();

app.get('/products', async (req, res) => {
  res.render('index');
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

export default app;
