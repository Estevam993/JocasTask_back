import {
  Column as ColumnDecorator,
  Table,
  Model,
  BeforeSave,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Column } from 'src/columns/entities/column.entity';

@Table({
  tableName: 'tasks',
})
export class Task extends Model {
  @BelongsTo(() => Column)
  column: Column;

  @ColumnDecorator({
    type: DataType.STRING,
  })
  description: string;

  @ColumnDecorator({
    type: DataType.STRING,
  })
  status: string;

  @ForeignKey(() => Column)
  @AllowNull(false)
  @ColumnDecorator({
    type: DataType.INTEGER,
  })
  column_id: number;

  @BeforeSave
  static async setStatus(task: Task) {
    task.status = 'ACTIVE';
  }

  async disable(fieldsToUpdate: Partial<Task>): Promise<void> {
    fieldsToUpdate.status = 'INACTIVE';

    await this.update(fieldsToUpdate);
  }
}
