import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Promotion extends Model {
        static associate(models) {
            this.hasMany(models.Room, { foreignKey: "promotionId" });
        }
    }

    Promotion.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false },
            discount: { type: DataTypes.FLOAT, allowNull: false },
        },
        {
            sequelize,
            modelName: "Promotion",
            tableName: "promotions",
            timestamps: true,
        }
    );

    return Promotion;
};
