import { Router } from "express";
import { createDetailsOfSails } from "../../components/sales/detalle_venta/controllers/create.detalle_venta.controller.js";
import { getDetailsOfSails, getDetailsOfSailsById } from "../../components/sales/detalle_venta/controllers/get.detalle_venta.controller.js";
import { updateStockProducts } from '../../components/sales/detalle_venta/controllers/update.cantidad_producto.controller.js';

const router = Router();

router.post('/', createDetailsOfSails);
router.get('/', getDetailsOfSails);
router.get('/:id', getDetailsOfSailsById);
router.put('/', updateStockProducts);

export default router;