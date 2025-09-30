import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Review extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "userId" });
            this.belongsTo(models.Room, { foreignKey: "roomId" });
        }
    }

    Review.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            userId: { type: DataTypes.INTEGER, allowNull: false },
            roomId: { type: DataTypes.INTEGER, allowNull: false },
            rating: { type: DataTypes.INTEGER, allowNull: false },
            comment: { type: DataTypes.TEXT },
        },
        {
            sequelize,
            modelName: "Review",
            tableName: "reviews",
            timestamps: true,
        }
    );

    return Review;
};
