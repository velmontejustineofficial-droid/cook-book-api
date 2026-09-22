import { successResponse, errorResponse } from '../../../core/http/responses/response.js';
import { updateRecipeService } from './updateRecipe.service.js';

export async function updateRecipeController(req, res) {
  try {
    const { id } = req.params;

    // 1. Siguraduhing may naipasa na ID sa URL parameter
    if (!id) {
      return errorResponse(res, "Recipe ID is required", 400);
    }

    // 2. Ipasa ang ID at ang req.body sa service layer
    const updatedRecipe = await updateRecipeService(id, req.body);

    // 3. Ibalik ang tagumpay na response (200 OK)
    return successResponse(res, updatedRecipe, "Recipe updated successfully", 200);

  } catch (error) {
    // Handling para sa Zod validation errors (mula sa schema check)
    if (error.name === 'ZodError') {
      const formattedErrors = error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return errorResponse(res, "Validation failed", 422, formattedErrors);
    }

    // Handling kapag hindi nahanap ang recipe sa database (404)
    if (error.message === 'Recipe not found') {
      return errorResponse(res, "Recipe not found", 404, error.message);
    }

    // Fallback error handling (400 Bad Request / Internal Server Error)
    return errorResponse(res, "Failed to update recipe", 400, error.message);
  }
}