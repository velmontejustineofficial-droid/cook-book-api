import { errorResponse, successResponse } from "../../../core/http/responses/response.js";
import { updateRecipe } from "./usecase.js";

export async function updateRecipeController(req, res) {
    try {
        const recipe = await updateRecipe(req.params.id, req.body);

        return successResponse(res, recipe, "Recipe updated successfully");
    } catch (error) {
        return errorResponse(res, "Failed to update recipe", 400, error.message);
    }
}
