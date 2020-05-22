import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resource } from '../../database/model/resource';
// import { UserController } from './user.controller';
@Module({
  // controllers: [UserController],
  imports: [SequelizeModule.forFeature([Resource])],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}