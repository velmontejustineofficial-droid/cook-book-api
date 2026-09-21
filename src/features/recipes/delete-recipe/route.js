import { Router } from "express";
import { deleteRecipeController } from "./controller.js";

const router = Router();

router.delete("/delete/:id", deleteRecipeController);

export default router;
