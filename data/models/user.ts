import { DataTypes, Sequelize } from 'sequelize';

// Keep in sync with both graphql/schema/user.js and migrations/[date]-create-user.js
export default function User(sequelize: Sequelize) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(191),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 191],
        },
      },
      email: {
        type: DataTypes.STRING(191),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
          len: [3, 191],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  // @ts-ignore fix later.
  User.associate = function (models) {
    // associations can be defined here
  };

  return User;
}
