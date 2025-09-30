export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("products", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    categoryId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "categories", key: "id" },
      onDelete: "CASCADE",
    },
    name: { type: Sequelize.STRING(200), allowNull: false },
    description: { type: Sequelize.TEXT },
    price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    imageUrls: { type: Sequelize.JSON },
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
  await queryInterface.dropTable("products");
}
