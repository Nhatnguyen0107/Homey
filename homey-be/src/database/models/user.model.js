import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class User extends Model {
        static associate(models) {
            this.hasOne(models.RefreshToken, { foreignKey: "userId" });
            this.hasOne(models.Profile, { foreignKey: "userId" });
            this.hasMany(models.Order, { foreignKey: "userId" });
            this.belongsToMany(models.Role, { through: "user_roles" });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            name: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            passwordHash: { type: DataTypes.STRING },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: true,
            defaultScope: {
                attributes: { exclude: ["passwordHash"] },
            },
            scopes: {
                withPassword: { attributes: {} },
            },
        }
    );

    return User;
};
