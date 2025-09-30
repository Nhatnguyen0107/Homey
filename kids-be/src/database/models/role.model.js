import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.User, { through: "user_roles" });
    }
  }

  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    { sequelize, modelName: "Role", tableName: "roles" }
  );

  return Role;
};
