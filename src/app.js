import express from 'express';
import ProductsRoute from './routes/products.router.js';
import CartsRoute from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import ViewsRouters from './routes/viewsRouters.router.js';
import { __dirname } from './utils.js';

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
