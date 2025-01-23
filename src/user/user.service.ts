import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private userRepository: typeof User)
  {}

  async create(createUserDto: CreateUserDto) {
    try{
      const user = await this.userRepository.create(createUserDto as any);
      console.log(user);
      return `Usuario ${user.name} criado com sucesso`;
    }catch (error) {
      return (error)
    }
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    try {
      return await this.userRepository.update(updateUserDto, { where: { id } });

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
