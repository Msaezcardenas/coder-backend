import express from 'express';
import ProductsRoute from './routes/products.router.js';
import CartsRoute from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import ViewsRouters from './routes/viewsRouters.router.js';
import { __dirname } from './utils.js';
import { Server, Socket } from 'socket.io';
import ProductManager from './Class/ProductManager.js';
import mongoose from 'mongoose';
import { ProductModel } from './model/product.model.js';

const productManager = new ProductManager(__dirname + '/data/products.json');

const app = express();
const port = 8080;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/products/', ProductsRoute);
app.use('/api/carts/', CartsRoute);
app.use('/', ViewsRouters);
app.use(express.static(__dirname + '/public'));

const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const socketServer = new Server(httpServer);

// socketServer.on('connection', async (socket) => {
//   console.log('Nueva coonexion');

//   try {
//     const productList = await productManager.getProducts();
//     socket.emit('products', productList);
//     socket.emit('realtime', productList);
//   } catch (error) {
//     console.log(error);
//   }

//   socket.on('new-product', async (product) => {
//     await productManager.addProduct(product);
//   });

//   socket.on('delete-product', async (id) => {
//     console.log({ id });
//     await productManager.deleteProduct(id);
//     const updateProducts = await productManager.getProducts();
//     socket.emit('realtime', updateProducts);
//   });

mongoose
  .connect(
    'mongodb+srv://molusaezcardenas:tSUzZOhFjzWqQmid@ecommerce.cxnn6t9.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce',
    { dbName: 'products' },
  )
  .then(() => {
    console.log('lista BD mongoDB');
  });

// });
