import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';
@Injectable()
export class UserService {
  async findOne(userName: string): Promise<any | undefined> {
    const sql = `
          SELECT
            id, userName, nickName, picture FROM users
          WHERE
          userName = '${userName}'
        `; // 一段平淡无奇的 SQL 查询语句
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
      });
      console.log('设计师设计', res)
      const user = res[0]; // 查出来的结果是一个数组，我们只取第一个。
      if (user) {
        return {
          code: 200, // 返回状态码，可自定义
          data: {
            user,
          },
          msg: 'Success',
        };
      } else {
        return {
          code: 600,
          msg: '查无此人',
        };
      }
    } catch (error) {
        console.log('错误', error)
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
