import { Router } from "express";
import { getPersonaById } from "../../components/users/personas_naturales/controllers/get.persona.controller.js";
import { createPersona } from "../../components/users/personas_naturales/controllers/create.persona.controller.js";

const router = Router();

router.post('/', createPersona)
router.get('/:id', getPersonaById)

export default router;



