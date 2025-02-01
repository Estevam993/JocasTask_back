import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FramesService } from './frames.service';
import { FramesController } from './frames.controller';
import { Frame } from './entities/frame.entity';

@Module({
  imports: [SequelizeModule.forFeature([Frame])],
  controllers: [FramesController],
  providers: [FramesService],
  exports: [FramesService],
})
export class FramesModule {}
