import { Router } from "express";
import { createRecipeController } from "./controller.js";

const router = Router();

router.post("/create", createRecipeController);


export default router;