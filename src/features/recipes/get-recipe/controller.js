import { errorResponse, successResponse } from "../../../core/http/responses/response.js";
import { getRecipe } from "./usecase.js";

export async function getRecipeController(req, res) {
    try {
        const recipe = await getRecipe(req.params.id);

        if (!recipe) {
            return errorResponse(res, "Recipe not found", 404);
        }

        return successResponse(res, recipe, "Recipe retrieved successfully");
    } catch (error) {
        return errorResponse(res, "Failed to retrieve recipe", 500, error.message);
    }
}
