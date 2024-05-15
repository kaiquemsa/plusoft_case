import Gadget from "../entities/Gadgets";
import { AppDataSource } from "../database/data-source";

export class GetAllGadgetsService {
  async execute(): Promise<Gadget[]> {
    const repository = AppDataSource.getRepository(Gadget);

    const Gadgets = await repository.find();

    return Gadgets;
  }
}