import { Injectable } from '@nestjs/common';
// import * as Sequelize from 'sequelize';
// import sequelize from '../../database/sequelize';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';
import { DEFAULT_PICTURE } from '../../../config/constants';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/model/user';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  /**
   * 查询是否有该用户
   * @param userName 用户名
   */
  async findOne(userName: string): Promise<any | undefined> {
    try {
      // const user = (await sequelize.query(sql, {
      //   type: Sequelize.QueryTypes.SELECT, // 查询方式
      //   raw: true, // 是否使用数组组装的方式展示结果
      //   logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
      // }))[0];
      const user = this.userModel.findOne({ where: { userName } });
      console.log('user', user);
      return user;
    } catch (error) {
      console.log(error);
      return void 0;
    }
  }

  async register(requestBody: any): Promise<any> {
    const { userName, password, repassword } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次输入密码不一致',
      };
    }
    const user = await this.findOne(userName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    // const sql = `
    //   INSERT INTO users (userName, password, password_salt,nickName,picture)
    //   VALUES
    //   ('${userName}','${hashPwd}','${salt}','${userName}','${DEFAULT_PICTURE}')
    // `;
    // try {
    //   await sequelize.query(sql, { logging: false });
    //   return {
    //     code: 200,
    //     msg: 'Success',
    //   };
    // } catch (error) {
    //   return {
    //     code: 503,
    //     msg: `Service error: ${error}`,
    //   };
    // }
    try {
      const user =  await this.userModel.create({
        userName,
        passwd: hashPwd,
        passwdSalt: salt,
        nickName: userName,
        picture: DEFAULT_PICTURE,
      });
      console.log('创建用户', user)
      return {
        code: 200,
        msg: 'sucess',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
