import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Booking extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "userId" });
            this.belongsTo(models.Room, { foreignKey: "roomId" });
        }
    }

    Booking.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            userId: { type: DataTypes.INTEGER, allowNull: false },
            roomId: { type: DataTypes.INTEGER, allowNull: false },
            checkIn: { type: DataTypes.DATE, allowNull: false },
            checkOut: { type: DataTypes.DATE, allowNull: false },
        },
        {
            sequelize,
            modelName: "Booking",
            tableName: "bookings",
            timestamps: true,
        }
    );

    return Booking;
};
