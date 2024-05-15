import Sold from "../entities/Sold";
import { AppDataSource } from "../database/data-source";

export class GetAllSoldService {
  async execute(): Promise<Sold[]> {
    const repository = AppDataSource.getRepository(Sold);

    const ProductSold = await repository.find();

    return ProductSold;
  }
}