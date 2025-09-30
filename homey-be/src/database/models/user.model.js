import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.RefreshToken, { foreignKey: "userId" });
      this.hasOne(models.Profile, { foreignKey: "userId" });
      this.hasMany(models.Order, { foreignKey: "userId" });
      this.belongsToMany(models.Role, { through: "user_roles" });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Auto-generates a UUID
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize, // truyền kết nối
      modelName: "User", // tên model
      tableName: "users",
      timestamps: true,
      // 👇 This hides passwordHash from queries by default
      defaultScope: {
        attributes: { exclude: ["passwordHash", "refreshToken"] },
      },
      // Optional: allow an "includeSensitive" scope if you need the password
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );

  return User;
};
