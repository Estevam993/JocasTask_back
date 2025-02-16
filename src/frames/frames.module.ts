import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FramesService } from './frames.service';
import { FramesController } from './frames.controller';
import { Frame } from './entities/frame.entity';
import { Column } from 'src/columns/entities/column.entity';

@Module({
  imports: [SequelizeModule.forFeature([Frame, Column])],
  controllers: [FramesController],
  providers: [FramesService],
  exports: [FramesService],
})
export class FramesModule {}
