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
  DataType,
  HasMany
} from 'sequelize-typescript';
import { Post } from './post'

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
  user_name: string;

  @AllowNull(false)
  @Comment('用户密码')
  @Column
  passwd: string;

  @AllowNull(false)
  @Comment('用户密码盐')
  @Column
  passwd_salt: string;

  @AllowNull(false)
  @Comment('用户昵称')
  @Column
  nick_name: string;

  @AllowNull(false)
  @Comment('用户头像地址')
  @Column
  picture: string;

  @HasMany(() => Post)
  posts: Post[];
}
