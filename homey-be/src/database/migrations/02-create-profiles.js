export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("profiles", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    address: { type: Sequelize.STRING(255) },
    phone: { type: Sequelize.STRING(30) },
    dateOfBirth: { type: Sequelize.DATEONLY },
    avatarUrl: { type: Sequelize.STRING(255) },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("profiles");
}
