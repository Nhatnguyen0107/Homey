import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Product, { foreignKey: "categoryId" });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    { sequelize, modelName: "Category", tableName: "categories" }
  );

  return Category;
};
