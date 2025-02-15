import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column)
    private columnRepository: typeof Column,
  ) {}

  async create(column: CreateColumnDto) {
    if (!this.validateDescription(column.description))
      return {
        status: 'error',
        message: 'É obrigatorio uma descrição.',
      };

    try {
      const columnRequest = await this.columnRepository.create(column as any);

      return {
        id: columnRequest.id,
        status: 'success',
        message: 'Coluna criada com sucesso',
      };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.columnRepository.findAll();
  }

  async findByFrame(frame_id: number): Promise<Column[] | null> {
    return this.columnRepository.findAll({ where: { frame_id } });
  }

  findOne(id: number) {
    return this.columnRepository.findByPk(id);
  }

  async update(id: number, column: UpdateColumnDto) {
    try {
      const columnRequest = await this.findOne(id);

      if (!columnRequest) {
        throw new NotFoundException(`Coluna com ID ${id} não encontrado`);
      }

      if (!this.validateDescription(column.description)) {
        return {
          status: 'error',
          message: 'É obrigatorio uma descrição.',
        };
      }

      await columnRequest.update(column);

      return {
        id: columnRequest.id,
        status: 'success',
        message: `Coluna com id ${id} atualizado com sucesso`,
      };
    } catch (error) {}
  }

  async remove(id: number, updateColumnDto: UpdateColumnDto) {
    try {
      const column = await this.columnRepository.findByPk(id);

      if (!column) {
        throw new NotFoundException(`Coluna com ID ${id} não encontrado`);
      }

      if (column.status) {
        await column.disable(updateColumnDto);
      }

      return {
        id: column.id,
        status: 'success',
        message: `Coluna com ID ${id} desabilitado`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  validateDescription(desc: string) {
    return desc != '';
  }
}
