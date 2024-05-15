import { Request, Response } from "express";
import { CreateGadgetsService } from "../services/CreateGadgetService";

export default class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, description, img, price, quantity, availability } = request.body;

    const service = new CreateGadgetsService();

    try {
      const result = await service.execute({ name, description, img, price, quantity, availability });
      return response.json(result);
    } catch (error) {
      return response.status(400).json(error?.message);
    }
  }
}