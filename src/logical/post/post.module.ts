import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../../database/model/post';
import { PostResourceRelation } from '../../database/model/post_resource_relation';
// import { UserController } from './user.controller';
@Module({
  // controllers: [UserController],
  imports: [SequelizeModule.forFeature([Post,PostResourceRelation])],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
