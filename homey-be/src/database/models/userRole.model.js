import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class UserRole extends Model {}

  UserRole.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    { sequelize, modelName: "UserRole", tableName: "user_roles" }
  );

  return UserRole;
};
