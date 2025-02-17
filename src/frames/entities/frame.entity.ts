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
import { User } from 'src/user/entities/user.entity';
import { Column } from 'src/columns/entities/column.entity';

@Table({
  tableName: 'frames',
})
export class Frame extends Model {
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Column)
  columns: Column[];

  @ColumnDecorator({
    type: DataType.STRING,
  })
  status: string;

  @AllowNull(false)
  @ColumnDecorator({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @ColumnDecorator({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BeforeSave
  static async setStatus(frame: Frame) {
    frame.status = 'ACTIVE';
  }

  async disable(fieldsToUpdate: Partial<Frame>): Promise<void> {
    fieldsToUpdate.status = 'INACTIVE';

    await this.update(fieldsToUpdate);
  }
}
