import {Router} from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, upload} from '../components/products/controllers/products.controllers.js';

const router = Router();

router.get('/', getProducts );
router.get('/:id', getProduct);
/* router.post('/', upload.single("imagen"), createProduct); */
router.post("/", upload.single("imagen"), createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;