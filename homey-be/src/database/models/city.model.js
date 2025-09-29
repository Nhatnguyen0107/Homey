import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class City extends Model {
        static associate(models) {
            this.hasMany(models.Room, { foreignKey: "cityId" });
        }
    }

    City.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: "City",
            tableName: "cities",
            timestamps: true,
        }
    );

    return City;
};
