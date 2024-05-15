import { Request, Response } from "express";
import { GetAllSoldService } from "../services/GetAllSoldService";

export default class GetAllSoldController {
  async handle(_: Request, response: Response) {
    const service = new GetAllSoldService();

    const categories = await service.execute();

    return response.json(categories);
  }
}