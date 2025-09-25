import { Router } from "express";
import { createEmpresa } from "../../components/users/empresas/controllers/create.empresa.controller.js";
import { getEmpresaById } from "../../components/users/empresas/controllers/get.empresa.controller.js";

const router = Router();

router.post('/', createEmpresa);
router.get('/:id', getEmpresaById);

export default router;