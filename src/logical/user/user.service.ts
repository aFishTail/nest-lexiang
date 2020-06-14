import { Injectable, HttpService } from '@nestjs/common';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';
import { DEFAULT_PICTURE } from '../../../config/constants';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/model/user';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User, private readonly httpService: HttpService) {}
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
  async authGitHub(requestToken: string):Promise<any>{
    const clientID = 'e2b328cd374db3681c8a'
    const clientSecret = 'c06aa02f89832619e9ac656e20d37798dcb066da'
    // const tokenResponse = await this.httpService.post('https://github.com/login/oauth/access_token?' +
    // `client_id=${clientID}&` +
    // `client_secret=${clientSecret}&` +
    // `code=${requestToken}`);  
  
    // // const accessToken = tokenResponse.data.access_token;
    // // console.log(`access token: ${accessToken}`);
  
    // const result = await this.httpService.get('https://api.github.com/user',{
    //   headers: {
    //     accept: 'application/json',
    //     // Authorization: `token ${accessToken}`
    //   }
    // });
    // console.log(result);
    // const name = result.data.name;
    const result = await this.httpService.get('http://localhost:3000/list');
  
    // ctx.response.redirect(`/welcome.html?name=${name}`)
  }
}
