import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Room extends Model {
        static associate(models) {
            this.belongsTo(models.City, { foreignKey: "cityId" });
            this.belongsTo(models.Category, { foreignKey: "categoryId" });
            this.belongsTo(models.Promotion, { foreignKey: "promotionId" });
            this.hasMany(models.Booking, { foreignKey: "roomId" });
            this.hasMany(models.Review, { foreignKey: "roomId" });
        }
    }

    Room.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false },
            price: { type: DataTypes.FLOAT, allowNull: false },
            cityId: { type: DataTypes.INTEGER, allowNull: false },
            categoryId: { type: DataTypes.INTEGER, allowNull: false },
            promotionId: { type: DataTypes.INTEGER },
        },
        {
            sequelize,
            modelName: "Room",
            tableName: "rooms",
            timestamps: true,
        }
    );

    return Room;
};
