import { AppDataSource } from "../database/data-source";
import Gadgets from "../entities/Gadgets";

export default class DeleteCategoryService {
    async execute(id: string) {
      const repository = AppDataSource.getRepository(Gadgets);
  
      if (!(await repository.findOneBy({ id }))) {
        throw new Error("category not found");
      }
  
      await repository.delete(id);
    }
  }