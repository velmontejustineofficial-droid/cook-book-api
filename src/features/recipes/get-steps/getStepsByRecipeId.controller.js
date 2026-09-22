import { successResponse, errorResponse } from '../../../core/http/responses/response.js';
import { getStepsByRecipeIdService } from './getStepsByRecipeId.service.js';

export async function getStepsByRecipeIdController(req, res) {
  try {
    // Kunin ang 'id' mula sa req.params
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, "Recipe ID is required", 400);
    }

    const steps = await getStepsByRecipeIdService(id);

    return successResponse(
      res, 
      steps, 
      "Steps retrieved successfully", 
      200
    );

  } catch (error) {
    return errorResponse(
      res, 
      "Failed to retrieve steps", 
      500, 
      error.message
    );
  }
}