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
    { dbName: 'ecommerce' },
  )
  .then(() => {
    ProductModel.insertMany([
      {
        title: 'Extract - Almond',
        description: 'Destruction of Right Knee Tendon, Open Approach',
        code: '36987-3421',
        status: true,
        category: 'Sitework & Site Utilities',
        price: 7473,
        stock: 1,
      },
      {
        title: 'Cookie Double Choco',
        description: 'Revise of Extralum Dev in Cisterna Chyli, Perc Endo Approach',
        code: '11822-0271',
        status: false,
        category: 'Termite Control',
        price: 7277,
        stock: 2,
      },
      {
        title: 'Soup Bowl Clear 8oz92008',
        description: 'Repair Esophageal Vein, Percutaneous Approach',
        code: '53808-0725',
        status: true,
        category: 'Marlite Panels (FED)',
        price: 6308,
        stock: 3,
      },
      {
        title: 'Cheese - Manchego, Spanish',
        description: 'Supplement Right Little Finger with Autol Sub, Open Approach',
        code: '66715-9724',
        status: false,
        category: 'Construction Clean and Final Clean',
        price: 5278,
        stock: 4,
      },
      {
        title: 'Ice Cream Bar - Rolo Cone',
        description: 'Dilate R Colic Art, Bifurc, w 2 Intralum Dev, Perc',
        code: '42254-121',
        status: true,
        category: 'Drywall & Acoustical (FED)',
        price: 4968,
        stock: 5,
      },
      {
        title: 'Beef - Striploin Aa',
        description: 'Drainage of Right Renal Vein with Drain Dev, Perc Approach',
        code: '25000-139',
        status: true,
        category: 'Masonry & Precast',
        price: 4051,
        stock: 6,
      },
      {
        title: 'Wine - Rubyport',
        description: 'Excision of Rectum, Via Natural or Artificial Opening',
        code: '11410-406',
        status: false,
        category: 'Landscaping & Irrigation',
        price: 4649,
        stock: 7,
      },
      {
        title: 'Pasta - Canelloni',
        description: 'Dilation of 4+ Cor Art with 4+ Intralum Dev, Perc Approach',
        code: '0603-4212',
        status: true,
        category: 'Doors, Frames & Hardware',
        price: 5519,
        stock: 8,
      },
      {
        title: 'Zucchini - Yellow',
        description: 'Release Left Upper Leg Muscle, Open Approach',
        code: '41520-046',
        status: false,
        category: 'Exterior Signage',
        price: 7346,
        stock: 9,
      },
      {
        title: 'Loquat',
        description: 'Bypass L Ureter to L Ureter with Nonaut Sub, Open Approach',
        code: '11026-2662',
        status: true,
        category: 'Rebar & Wire Mesh Install',
        price: 6054,
        stock: 10,
      },
    ]);
    console.log('lista BD mongoDB');
  });

// });
