import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2'; // Needed to fix sequelize issues with WebPack
import user from './user';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
  database: process.env.NEXT_PUBLIC_DB_NAME,
  username: process.env.NEXT_PUBLIC_DB_USERNAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  logging: false,
});

export const User = user(sequelize);

const models = {
  User,
};
export default models;
