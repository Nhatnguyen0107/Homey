import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, { through: models.ProductTag });
    }
  }

  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    { sequelize, modelName: "Tag", tableName: "tags" }
  );

  return Tag;
};
