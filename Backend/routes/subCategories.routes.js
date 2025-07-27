import { Router } from "express";

import { getSubCategories, getSubCategoryById} from "../components/subCategories/controllers/subCategories.controllers.js";

const router = Router();

router.get("/", getSubCategories);
router.get("/:id", getSubCategoryById);

export default router;