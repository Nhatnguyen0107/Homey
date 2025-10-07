import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define("RoomType", {
        id: {
            type: DataTypes.UUID, // bây giờ OK
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        image_url: { type: DataTypes.STRING },
    }, {
        tableName: "room_types",
        timestamps: true,
    });
};
