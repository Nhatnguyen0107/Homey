import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Category);
      this.belongsToMany(models.Order, { through: models.OrderItem });
    }
  }

  Product.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      imageUrls: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize, // truyền kết nối
      modelName: "Product", // tên model
      tableName: "products",
      timestamps: true,
    }
  );

  return Product;
};
