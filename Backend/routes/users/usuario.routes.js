import { Router } from "express";
import {createUsuario} from "../../components/users/usuarios/controllers/create.usuario.controller.js";
import {getUsuarioById, getUsuarios} from "../../components/users/usuarios/controllers/get.usuario.controller.js";

const router = Router();

router.post('/', createUsuario)
router.get('/:id', getUsuarioById)
router.get('/', getUsuarios)


export default router;

