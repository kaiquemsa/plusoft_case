import Gadgets from "../entities/Gadgets";
import { AppDataSource } from "../database/data-source";
import { iGadget } from "../dtos/iGadget";

export class CreateGadgetsService {
  async execute({ name, description, img, price, quantity, availability }: iGadget): Promise<Gadgets> {
    const repository = AppDataSource.getRepository(Gadgets);

    if (await repository.findOneBy({ name })) {
      throw new Error("gadget already exists");
    }

    const Gadget = repository.create({ name, description, img, price, quantity, availability });

    await repository.save(Gadget);

    return Gadget;
  }
}