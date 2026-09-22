import { successResponse, errorResponse } from "../../../core/http/responses/response.js";
import { createRecipeService } from "./createRecipe.service.js";

export async function createRecipeController(req, res, next) {
    try {
        const recipe = await createRecipeService(req.body);

        return successResponse(res, recipe, "Recipe created successfully", 201);
  
    } catch (error) {
        return errorResponse(res, "Failed to create recipe", 400, error.message);
    }
}