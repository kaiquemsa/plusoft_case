import { Request, Response } from "express";
import DeleteGadgetService from "../services/DeleteGadgetService";

export default class DeleteGadgetController {
    async handle(request: Request, response: Response) {
      const { id } = request.params;
  
      const service = new DeleteGadgetService();
  
      try {
        await service.execute(id);
      } catch (error) {
        return response.status(400).json(error?.message);
      }
  
      return response.json();
    }
  }