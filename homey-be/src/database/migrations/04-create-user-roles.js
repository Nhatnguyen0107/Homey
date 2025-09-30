export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("user_roles", {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    roleId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "roles", key: "id" },
      onDelete: "CASCADE",
      primaryKey: true,
    },
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
  await queryInterface.dropTable("user_roles");
}
