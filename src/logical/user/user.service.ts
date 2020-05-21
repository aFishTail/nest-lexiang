import { Injectable } from '@nestjs/common';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';
import { DEFAULT_PICTURE } from '../../../config/constants';
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
      const user = this.userModel.findOne({ where: { userName } });
      console.log('user', user);
      return user;
    } catch (error) {
      console.log(error);
      return void 0;
    }
  }

  async register(requestBody: any): Promise<any> {
    const { userName, passwd, repasswd } = requestBody;
    if (passwd !== repasswd) {
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
    const hashPwd = encryptPassword(passwd, salt);
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
