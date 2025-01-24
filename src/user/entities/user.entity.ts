import { Column, Table, Model, BeforeSave } from 'sequelize-typescript';
import { hashSync, compareSync } from 'bcrypt';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column
  status: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

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
