import {
  Column as ColumnDecorator,
  Table,
  Model,
  BeforeSave,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Frame } from 'src/frames/entities/frame.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Table({
  tableName: 'columns',
})
export class Column extends Model {
  @BelongsTo(() => Frame)
  frame: Frame;

  @HasMany(() => Task)
  tasks: Task[];

  @ColumnDecorator({
    type: DataType.STRING,
  })
  status: string;

  @AllowNull(false)
  @ColumnDecorator({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => Frame)
  @AllowNull(false)
  @ColumnDecorator({
    type: DataType.INTEGER,
  })
  frame_id: number;

  @BeforeSave
  static async setStatus(column: Column) {
    column.status = 'ACTIVE';
  }

  async disable(fieldsToUpdate: Partial<Column>): Promise<void> {
    fieldsToUpdate.status = 'INACTIVE';

    await this.update(fieldsToUpdate);
  }
}
