const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    dialect: 'mysql',
    database: process.env.NEXT_PUBLIC_DB_NAME,
    username: process.env.NEXT_PUBLIC_DB_USERNAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    port: process.env.NEXT_PUBLIC_DB_PORT,
    seederStorage: 'sequelize',
  },
  test: {
    dialect: 'mysql',
    database: process.env.NEXT_PUBLIC_DB_NAME,
    username: process.env.NEXT_PUBLIC_DB_USERNAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    port: process.env.NEXT_PUBLIC_DB_PORT,
    seederStorage: 'sequelize',
  },
  production: {
    dialect: 'mysql',
    database: process.env.NEXT_PUBLIC_DB_NAME,
    username: process.env.NEXT_PUBLIC_DB_USERNAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    port: process.env.NEXT_PUBLIC_DB_PORT,
    seederStorage: 'sequelize',
  },
};

const envConfig = config[env];
export default envConfig;
