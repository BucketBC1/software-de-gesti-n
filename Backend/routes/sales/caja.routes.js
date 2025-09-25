import { Router } from "express";
import {createCaja, getCajas, getCajaById} from "../../components/sales/caja/controllers/caja.controllers.js";

const router = Router()

router.get('/', getCajas)
router.get('/:id', getCajaById)
router.post('/', createCaja)

export default router;

