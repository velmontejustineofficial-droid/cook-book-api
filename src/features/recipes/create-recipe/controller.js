import { successResponse, errorResponse } from "../../../core/http/responses/response.js";
import { createRecipe } from "./usecase.js";

export async function createRecipeController(req, res, next) {
    try {
        const recipe = await createRecipe(req.body);

        return successResponse(res, recipe, "Recipe created successfully", 201);
                
    } catch (error) {
        return errorResponse(res, "Failed to create recipe", 400, error.message);
    }
}