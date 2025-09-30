import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class ProductTag extends Model {}

  ProductTag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    { sequelize, modelName: "ProductTag", tableName: "product_tags" }
  );

  return ProductTag;
};
