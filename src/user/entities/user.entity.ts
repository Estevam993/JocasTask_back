import { Column, Table, Model, BeforeSave } from 'sequelize-typescript';
import {hash, compare} from 'bcrypt';

@Table({
  tableName: 'users',
})
export class User extends Model {
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
      user.password = await hash(user.password, saltRounds);
    }
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.password);
  }
}