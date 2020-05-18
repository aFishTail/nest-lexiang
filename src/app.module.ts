import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './logical/user/user.service';
import { UserController } from './logical/user/user.controller';
import { UserModule } from './logical/user/user.module';
// import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { mysqlConfig } from '../config/db';
import { User } from './database/model/user';

console.log(mysqlConfig);
@Module({
  imports: [
    UserModule,
    AuthModule,
    SequelizeModule.forRoot({
      // dialect: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '123456',
      // database: 'test',
      // models: [User],
      // pool: {
      //   max: 5,
      //   min: 0,
      //   acquire: 30000,
      //   idle: 10000
      // },
      ...mysqlConfig,
      dialect: 'mysql',
      autoLoadModels: true,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
