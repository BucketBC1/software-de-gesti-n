import {Router} from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProductById, upload} from '../components/products/controllers/products.controllers.js';

const router = Router();

router.get('/', getProducts );
router.get('/:id', getProduct);
router.post("/", upload.single("imagen"), createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProduct);

export default router;