/**
 * @description user model
 * @author wh
 */
import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType
} from 'sequelize-typescript';

import { Post } from './post';
import { Resource } from './resource';

@Table
export class PostResourceRelation extends Model<PostResourceRelation> {
  @ForeignKey(() => Resource)
  @Column({ type: DataType.INTEGER, field: 'post_id' })
  postId: number;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, field: 'resource_id' })
  resourceId: string;
}
