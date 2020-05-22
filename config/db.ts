// config/db.ts
const productConfig = {
  mysql: {
    // dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test',
    underscored: true,//下划线
    timezone: '+08:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialect: 'mysql'
  },
};

const localConfig = {
  mysql: {
    // dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test',
    underscored: true,//下划线
    timezone: '+08:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialect: 'mysql'
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;
export const mysqlConfig = config.mysql;
export default config;
