import {Router} from 'express';
import { createCategorie, deleteCategorie, getCategorie, getCategories, updateCategorie } from '../components/categories/controllers/categories.controllers.js';

const router = Router()

router.get('/', getCategories)
router.get('/:id', getCategorie)
router.post('/', createCategorie)
router.put('/:id', updateCategorie)
router.delete('/:id', deleteCategorie)

export default router;

