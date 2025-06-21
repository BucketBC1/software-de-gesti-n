import express from 'express';
import productsRoutes from './routes/products.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import cors from 'cors';

const app = express();


app.use(express.json())

app.use(cors());
app.use('/categorias', categoriesRoutes)
app.use('/productos', productsRoutes)


export default app;