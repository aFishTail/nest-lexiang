import { Module, HttpModule } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../database/model/user';
// import { UserController } from './user.controller';
@Module({
  // controllers: [UserController],
  imports: [SequelizeModule.forFeature([User]), HttpModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
