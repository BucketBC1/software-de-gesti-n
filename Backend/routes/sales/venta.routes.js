import { Router } from "express";
import { createSale } from "../../components/sales/venta/controllers/create.venta.controller.js";
import { getSale, getSaleById } from "../../components/sales/venta/controllers/get.venta.controller.js";


const router = Router();

router.post('/', createSale);
router.get('/', getSale)
router.get('/:id', getSaleById)

export default router;