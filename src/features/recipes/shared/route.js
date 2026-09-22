import { Router } from "express";
import { createRecipeController } from "../create-recipe/createRecipe.controller.js";
import { deleteRecipeController } from "../delete-recipe/deleteRecipe.controller.js";
import { updateRecipeController } from "../update-recipe/updateRecipe.controller.js";
import { getAllRecipesController } from "../get-all-recipe/getAllRecipes.controller.js";

const router = Router();

router.post("/create", createRecipeController);
router.delete("/delete/:id", deleteRecipeController);
router.put('/update/:id', updateRecipeController);
router.get("/", getAllRecipesController);

export default router;
