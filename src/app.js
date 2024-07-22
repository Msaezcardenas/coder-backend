import express from 'express';
import ProductsRoute from './routes/products.router.js';
import CartsRoute from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import ViewsRouters from './routes/viewsRouters.router.js';
import { __dirname } from './utils.js';
import { Server, Socket } from 'socket.io';
import ProductManager from './Class/ProductManager.js';
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

const productList = await productManager.getProducts();

const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('Nueva coonexion');

  io.emit('productos', productList);
  socket.on('new-product', async (product) => {
    console.log(product);
    const test = await productManager.addProduct(product);
  });
});
