import express from 'express';
import productsRoutes from './routes/products.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import subCategoriesRoutes from './routes/subCategories.routes.js';
import cajasRoutes from './routes/caja.routes.js';

import path from 'path';
import cors from 'cors';

const app = express();


app.use('/uploads', express.static(path.join(process.cwd(), "backend", "uploads")));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json())

app.use(cors());
app.use('/cajas', cajasRoutes)
app.use('/categorias', categoriesRoutes)
app.use('/productos', productsRoutes)
app.use('/subcategorias', subCategoriesRoutes)


export default app;