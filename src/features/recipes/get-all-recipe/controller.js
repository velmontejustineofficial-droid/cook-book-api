import { errorResponse, successResponse } from "../../../core/http/responses/response.js";
import { getAllRecipes } from "./usecase.js";

export async function getAllRecipesController(req, res) {
    try {
        const recipes = await getAllRecipes();

        return successResponse(res, recipes, "Recipes retrieved successfully");
    } catch (error) {
        return errorResponse(res, "Failed to retrieve recipes", 500, error.message);
    }
}
