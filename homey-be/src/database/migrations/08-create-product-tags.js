export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("product_tags", {
    productId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "products", key: "id" },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    tagId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "tags", key: "id" },
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
  await queryInterface.dropTable("product_tags");
}
