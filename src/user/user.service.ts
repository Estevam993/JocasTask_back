import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async create(user: CreateUserDto) {
    if (!this.validateName(user.name)) {
      return {
        status: 'error',
        message: `O nome de usuário é obrigatorio.`,
      };
    }

    if (!this.validateEmail(user.email)) {
      return {
        status: 'error',
        message: `O email é invalido.`,
      };
    }

    if (!this.validatePassword(user.password)) {
      return {
        status: 'error',
        message: `A senha precisa ter mais de 3 caracteres.`,
      };
    }

    try {
      const userRequest = await this.userRepository.create(user as any);

      return {
        id: userRequest.id,
        status: 'success',
        message: `Usuario ${userRequest.name} criado com sucesso`,
      };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findByPk(id);
  }

  async update(id: number, user: UpdateUserDto) {
    try {
      const userRequest = await this.userRepository.findByPk(id);

      if (!userRequest) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      if (this.validatePassword(user.password)) {
        return {
          status: 'error',
          message: `A senha precisa ter mais de 3 caracteres.`,
        };
      }

      if (this.validateName(user.name)) {
        return {
          status: 'error',
          message: `O nome de usuário é obrigatorio.`,
        };
      }

      if (this.validateEmail(user.email)) {
        return {
          status: 'error',
          message: `O email é invalido.`,
        };
      }

      if (this.validatePassword(user.password)) {
        return {
          status: 'error',
          message: `A senha precisa ter mais de 3 caracteres.`,
        };
      }

      if (user.password) {
        await userRequest.updateWithPassword(user);
      } else {
        await userRequest.update(user);
      }

      return {
        id: userRequest.id,
        status: 'success',
        message: `Usuário com ID ${id} atualizado com sucesso`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findByPk(id);

      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      if (user.status) {
        await user.disable(updateUserDto);
      }

      return {
        id: user.id,
        status: 'success',
        message: `Usuário com ID ${id} desabilitado`,
      };

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  validateName(name: string): boolean {
    const regex = /^.{1,}$/;

    return !!regex.test(name);
  }

  validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return !!regex.test(email);
  }

  validatePassword(password: string) {
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regex = /^.{3,}$/;

    return !!regex.test(password);
  }
}
