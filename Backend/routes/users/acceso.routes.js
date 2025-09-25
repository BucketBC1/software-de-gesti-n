import { Router } from "express";
import { createAcceso } from "../../components/users/accesos/controllers/create.acceso.controller.js";

const router = Router();

router.post('/', createAcceso);

export default router;


