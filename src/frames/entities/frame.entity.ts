import {
  Column,
  Table,
  Model,
  BeforeSave,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'frames',
})
export class Frame extends Model {
  @Column({
    type: DataType.STRING,
  })
  status: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @BeforeSave
  static async setStatus(frame: Frame) {
    frame.status = 'ACTIVE';
  }

  async disable(fieldsToUpdate: Partial<Frame>): Promise<void> {
    fieldsToUpdate.status = 'INACTIVE';

    await this.update(fieldsToUpdate);
  }
}
