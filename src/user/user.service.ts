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

  async create(createUserDto: CreateUserDto) {
    if (this.validatePassword(createUserDto.password)) {
      try {
        const user = await this.userRepository.create(createUserDto as any);

        const response = {
          id: user.id,
          status: 'success',
          message: `Usuario ${user.name} criado com sucesso`,
        };

        return JSON.stringify(response);
      } catch (error) {
        return error;
      }
    }
    const response = {
      status: 'error',
      message: `A senha precisa ter mais de 3 caracteres.`,
    };

    return JSON.stringify(response);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findByPk(id);

      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      if (this.validatePassword(updateUserDto.password)) {
        if (updateUserDto.password) {
          await user.updateWithPassword(updateUserDto);
        } else {
          await user.update(updateUserDto);
        }

        const response = {
          id: user.id,
          status: 'success',
          message: `Usuário com ID ${id} atualizado com sucesso`,
        };
        return JSON.stringify(response);
      }

      const response = {
        status: 'error',
        message: `A senha precisa ter mais de 3 caracteres.`,
      };

      return JSON.stringify(response);
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

      const response = {
        id: user.id,
        status: 'success',
        message: `Usuário com ID ${id} desabilitado`,
      };

      return JSON.stringify(response);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } }); // Busca por e-mail
  }

  validatePassword(password: string) {
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regex = /^.{3,}$/;

    return !!regex.test(password);
  }
}
