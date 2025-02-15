import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskRepository: typeof Task,
  ) {}

  async create(task: CreateTaskDto) {
    if (!this.validateDescription(task.description))
      return {
        status: 'error',
        message: 'É obrigatorio uma descrição.',
      };

    try {
      const taskRequest = await this.taskRepository.create(task as any);

      return {
        id: taskRequest.id,
        status: 'success',
        message: 'Quadro criado com sucesso',
      };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.taskRepository.findAll();
  }

  async findByColumn(column_id: number): Promise<Task[] | null> {
    return this.taskRepository.findAll({ where: { column_id } });
  }

  findOne(id: number) {
    return this.taskRepository.findByPk(id);
  }

  async update(id: number, task: UpdateTaskDto) {
    try {
      const taskRequest = await this.findOne(id);

      if (!taskRequest) {
        throw new NotFoundException(`Atividade com ID ${id} não encontrado`);
      }

      if (!this.validateDescription(task.description)) {
        return {
          status: 'error',
          message: 'É obrigatorio uma descrição.',
        };
      }

      await taskRequest.update(task);

      return {
        id: taskRequest.id,
        status: 'success',
        message: `Atividade com id ${id} atualizado com sucesso`,
      };
    } catch (error) {}
  }

  async remove(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findByPk(id);

      if (!task) {
        throw new NotFoundException(`Atividade com ID ${id} não encontrado`);
      }

      if (task.status) {
        await task.disable(updateTaskDto);
      }

      return {
        id: task.id,
        status: 'success',
        message: `Atividade com ID ${id} desabilitado`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  validateDescription(desc: string) {
    return desc != '';
  }
}
