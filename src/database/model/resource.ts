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
    ForeignKey,
    BelongsTo,
    BelongsToMany
  } from 'sequelize-typescript';
  
import { User } from './user'
import { Post } from './post'
import { PostResourceRelation } from './post_resource_relation'
  @Table
  export class Resource extends Model<Resource> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Comment('blog id')
    @Column(DataType.INTEGER)
    id: number;
  
    @Unique
    @AllowNull(false)
    @Comment('资源名称')
    @Column
    name: string;
  
  
    @AllowNull(false)
    @Comment('资源链接')
    @Column
    link: string;

    @AllowNull(false)
    @Comment('资源链接提取码')
    @Column
    link_code: string;

    @AllowNull(false)
    @Comment('资源类型')
    @Column(DataType.ENUM('百度云','天翼云','B站','其他'))
    type: string;
    
    @ForeignKey(() => User)
    @Column
    author_id: number;
    
    @BelongsTo(() => User)
    author: User;

    @BelongsToMany(() => Post, () => PostResourceRelation)
    posts: Post[]
  }
  