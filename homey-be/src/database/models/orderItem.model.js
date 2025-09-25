import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class OrderItem extends Model {}

  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    { sequelize, modelName: "OrderItem", tableName: "order_items" }
  );

  return OrderItem;
};
