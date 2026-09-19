import { Router } from "express";
import { updateRecipeController } from "./controller.js";

const router = Router();

router.put("/update/:id", updateRecipeController);

export default router;
