// database/migrations/05_add_image_url_to_categories.js
export async function up(queryInterface, Sequelize) {
    await queryInterface.addColumn("categories", "image_url", {
        type: Sequelize.STRING(255),
        allowNull: true,
    });
}

export async function down(queryInterface) {
    await queryInterface.removeColumn("categories", "image_url");
}
