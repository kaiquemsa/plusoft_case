import { Request, Response } from "express";
import UpdateGadgetService from "../services/UpdateGadgetService";

export default class UpdateGadgetController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description, img, price, quantity, availability } = request.body;

    const service = new UpdateGadgetService();

    try {
      const category = await service.execute({ id, name, description, img, price, quantity, availability });
      return response.json(category);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}