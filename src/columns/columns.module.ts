import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { Column } from './entities/column.entity';

@Module({
  imports: [SequelizeModule.forFeature([Column])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService]
})
export class ColumnsModule {}
