import express from 'express';
/* import { verificarToken } from './middlewares/authMiddleware.js'; */

/* ===== inventario ====== */
import productsRoutes from './routes/inventory/products.routes.js';
import categoriesRoutes from './routes/inventory/categories.routes.js';
import subCategoriesRoutes from './routes/inventory/subCategories.routes.js';
/* ===== inventario ====== */

/* ===== ventas ====== */
import cajasRoutes from './routes/sales/caja.routes.js';
import detalle_ventaRoutes from './routes/sales/detalle_venta.routes.js'
import ventaRoutes from './routes/sales/venta.routes.js'
/* ===== ventas ====== */

/* ===== usuarios ====== */
import usuarioRoutes from './routes/users/usuario.routes.js';
import personaRoutes from './routes/users/persona.routes.js'
import empresaRoutes from './routes/users/empresa.routes.js'
import accesoRoutes from './routes/users/acceso.routes.js'
import loginRoutes from './routes/users/login.routes.js'
/* ===== usuarios ====== */

import path from 'path';
import cors from 'cors';

const app = express();


app.use('/uploads', express.static(path.join(process.cwd(), "backend", "uploads")));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json())

app.use(cors());

app.use('/usuarios', usuarioRoutes)
app.use('/personas', personaRoutes)
app.use('/empresas', empresaRoutes)
app.use('/accesos', accesoRoutes)
app.use('/login', loginRoutes)

/* app.use(verificarToken); // Middleware para proteger las rutas siguientes */

app.use('/cajas', cajasRoutes)
app.use('/ventas', ventaRoutes)
app.use('/detalles', detalle_ventaRoutes)

app.use('/categorias', categoriesRoutes)
app.use('/productos', productsRoutes, detalle_ventaRoutes)
app.use('/subcategorias', subCategoriesRoutes)




export default app;