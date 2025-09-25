import Router from "express";
import { login } from "../../components/users/login/controllers/login.controller.js";

const router = Router();

router.post('/', login)

export default router;