import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class RefreshToken extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }

  RefreshToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      token: DataTypes.STRING,
      expiresAt: DataTypes.DATE,
    },
    { sequelize, modelName: "RefreshToken", tableName: "refresh_tokens" }
  );

  return RefreshToken;
};
