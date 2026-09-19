import { Router } from "express";
import { getAllRecipesController } from "./controller.js";

const router = Router();

router.get("/", getAllRecipesController);

export default router;
