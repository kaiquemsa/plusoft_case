import Sold from "../entities/Sold";
import { AppDataSource } from "../database/data-source";
import { iSold } from "../dtos/iSold";

export class CreateSellerService {
  async execute({ name, description, img, price, quantity, availability }: iSold): Promise<Sold> {
    const repository = AppDataSource.getRepository(Sold);

    const ProductSold = repository.create({ name, description, img, price, quantity, availability });

    await repository.save(ProductSold);

    return ProductSold;
  }
}