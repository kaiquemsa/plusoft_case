import { AppDataSource } from '../database/data-source';
import * as bcrypt from 'bcrypt';
import { iStudent } from '../dtos/iUser';
import Users from '../entities/Users';

export class AuthLoginUserService {
  async execute({ email, password }: Pick<iStudent, 'email' | 'password'>): Promise<Users> {
    const repository = AppDataSource.getRepository(Users);

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Senha incorreta');
    }

    return user;
  }
}