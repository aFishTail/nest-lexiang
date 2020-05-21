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
    @Comment('blog id')
    @Column(DataType.INTEGER)
    id: number;
  
    @Unique
    @AllowNull(false)
    @Comment('标题')
    @Column
    title: string;
  
  
    @AllowNull(false)
    @Comment('内容')
    @Column
    content: string;
  
    @AllowNull(false)
    @Comment('资源')
    @Column
    resource: string;
  }
  