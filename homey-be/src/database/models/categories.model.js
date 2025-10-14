// src/database/models/categories.model.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Category = sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            image_url: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            tableName: "categories",
            timestamps: true,
        }
    );

    return Category;
};
