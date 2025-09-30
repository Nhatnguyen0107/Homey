import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Payment extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "userId" });
            this.belongsTo(models.Booking, { foreignKey: "bookingId" });
        }
    }

    Payment.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            userId: { type: DataTypes.INTEGER, allowNull: false },
            bookingId: { type: DataTypes.INTEGER, allowNull: false },
            amount: { type: DataTypes.FLOAT, allowNull: false },
            status: { type: DataTypes.STRING, defaultValue: "pending" },
        },
        {
            sequelize,
            modelName: "Payment",
            tableName: "payments",
            timestamps: true,
        }
    );

    return Payment;
};
