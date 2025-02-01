import {
  Column,
  Table,
  Model,
  BeforeSave,
  AllowNull,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { hashSync, compareSync } from 'bcrypt';
import { Frame } from 'src/frames/entities/frame.entity';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
  })
  status: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @HasMany(() => Frame)
  frames: Frame[];

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.password) {
      const saltRounds = 10;
      user.password = await hashSync(user.password, saltRounds);
    }
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return compareSync(plainPassword, this.password);
  }

  async updateWithPassword(fieldsToUpdate: Partial<User>): Promise<void> {
    if (fieldsToUpdate.password) {
      const saltRounds = 10;
      fieldsToUpdate.password = await hashSync(
        fieldsToUpdate.password,
        saltRounds,
      );
    }
    await this.update(fieldsToUpdate);
  }

  async disable(fieldsToUpdate: Partial<User>): Promise<void> {
    fieldsToUpdate.status = 'INACTIVE';

    await this.update(fieldsToUpdate);
  }
}
