/**
 * @description user model
 * @author wh
 */
import {
  Column,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';

import { Post } from './post';
import { Resource } from './resource';

@Table
export class PostResourceRelation extends Model<PostResourceRelation> {
  @ForeignKey(() => Resource)
  @Column
  post_id: number;

  @ForeignKey(() => Post)
  @Column
  resource_id: string;
}
