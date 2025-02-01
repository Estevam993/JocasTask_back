import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFrameDto } from './dto/create-frame.dto';
import { UpdateFrameDto } from './dto/update-frame.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Frame } from './entities/frame.entity';

@Injectable()
export class FramesService {
  constructor(
    @InjectModel(Frame)
    private frameRepository: typeof Frame,
  ) {}

  async create(frame: CreateFrameDto) {
    if (!this.validateDescription(frame.description))
      return {
        status: 'error',
        message: 'É obrigatorio uma descrição.',
      };

    try {
      const frameRequest = await this.frameRepository.create(frame as any);

      return {
        id: frameRequest.id,
        status: 'success',
        message: 'Quadro criado com sucesso',
      };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.frameRepository.findAll();
  }

  async findByUser(user_id: number): Promise<Frame[] | null> {
    return this.frameRepository.findAll({ where: { user_id } });
  }

  findOne(id: number) {
    return this.frameRepository.findByPk(id);
  }

  async update(id: number, frame: UpdateFrameDto) {
    try {
      const frameRequest = await this.findOne(id);

      if (!frameRequest) {
        throw new NotFoundException(`Quadro com ID ${id} não encontrado`);
      }

      if (!this.validateDescription(frame.description)) {
        return {
          status: 'error',
          message: 'É obrigatorio uma descrição.',
        };
      }

      await frameRequest.update(frame);

      return {
        id: frameRequest.id,
        status: 'success',
        message: `Quadro com id ${id} atualizado com sucesso`,
      };
    } catch (error) {}
  }

  async remove(id: number, updateFrameDto: UpdateFrameDto) {
    try {
      const frame = await this.frameRepository.findByPk(id);

      if (!frame) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      if (frame.status) {
        await frame.disable(updateFrameDto);
      }

      return {
        id: frame.id,
        status: 'success',
        message: `Quadro com ID ${id} desabilitado`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  validateDescription(desc: string) {
    return desc != '';
  }
}
