import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './logical/user/user.service';
import { UserController } from './logical/user/user.controller';
import { UserModule } from './logical/user/user.module';
// import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { PostModule } from './logical/post/post.module';
import { mysqlConfig } from '../config/db';
import { User } from './database/model/user';
import { ResourceService } from './logical/resource/resource.service';
import { ResourceController } from './logical/resource/resource.controller';
import { ResourceModule } from './logical/resource/resource.module';

console.log(mysqlConfig);
@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    SequelizeModule.forRoot({
      ...mysqlConfig,
      dialect: 'mysql',
      autoLoadModels: true,
      synchronize: true,
      logging: true,
    }),
    ResourceModule,
  ],
  controllers: [AppController, UserController, ResourceController],
  providers: [AppService, ResourceService],
})
export class AppModule {}
