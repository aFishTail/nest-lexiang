/**
 * @description user model
 * @author wh
 */
import {
  Column,
  Model,
  Table,
  AllowNull,
  PrimaryKey,
  Comment,
  Unique,
  AutoIncrement,
  DataType
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Comment('用户id')
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Comment('用户名')
  @Column
  userName: string;

  @AllowNull(false)
  @Comment('用户密码')
  @Column
  passwd: string;

  @AllowNull(false)
  @Comment('用户密码盐')
  @Column
  passwdSalt: string;

  @AllowNull(false)
  @Comment('用户昵称')
  @Column
  nickName: string;

  @AllowNull(false)
  @Comment('用户头像地址')
  @Column
  picture: string;
}
