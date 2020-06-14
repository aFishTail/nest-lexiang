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
import { Resource } from './resource'
import { PostResourceRelation } from './post_resource_relation'
  @Table
  export class Post extends Model<Post> {
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
    @Column(DataType.TEXT)
    content: string;

    
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, field: 'author_id' })
    author_id: number;
    
    @BelongsTo(() => User)
    author: User;

    @BelongsToMany(() => Resource, () => PostResourceRelation)
    resource: Resource[]
  }
  