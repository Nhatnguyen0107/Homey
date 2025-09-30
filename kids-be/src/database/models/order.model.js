import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsToMany(models.Product, { through: models.OrderItem });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      total: DataTypes.FLOAT,
      status: DataTypes.STRING,
    },
    { sequelize, modelName: "Order", tableName: "orders" }
  );

  return Order;
};
