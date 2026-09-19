import { Router } from "express";
import { getRecipeController } from "./controller.js";

const router = Router();

router.get("/:id", getRecipeController);

export default router;
