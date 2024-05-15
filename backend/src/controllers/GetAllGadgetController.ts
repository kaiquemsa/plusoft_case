import { Request, Response } from "express";
import { GetAllGadgetsService } from "../services/GetAllGadgetService";

export default class GetAllGadgetsController {
  async handle(_: Request, response: Response) {
    const service = new GetAllGadgetsService();

    const categories = await service.execute();

    return response.json(categories);
  }
}