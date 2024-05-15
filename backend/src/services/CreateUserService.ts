import Users from "../entities/Users";
import { AppDataSource } from "../database/data-source";
import * as bcrypt from 'bcrypt';
import { iStudent } from "../dtos/iUser";

export class CreateUserService {
  async execute({ name, email, password }: iStudent): Promise<Users> {
    const repository = AppDataSource.getRepository(Users);

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = repository.create({ name, email, password: hashedPassword });

    await repository.save(User);

    return User;
  }
}