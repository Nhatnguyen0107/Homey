import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const now = new Date();

  // Giả sử đã biết user_id của chủ phòng, city_id, category_id
  const users = await queryInterface.sequelize.query(
    `SELECT id FROM users WHERE role_id != ''`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  const cities = await queryInterface.sequelize.query(
    `SELECT id FROM cities`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  const categories = await queryInterface.sequelize.query(
    `SELECT id FROM categories`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  await queryInterface.bulkInsert("rooms", [
    {
      id: uuidv4(),
      name: "Phòng Deluxe",
      description: "Phòng rộng rãi, đầy đủ tiện nghi",
      price: 100,
      stock: 5,
      image_url: null,
      city_id: cities[0].id,
      user_id: users[0].id,
      category_id: categories[0].id,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      name: "Phòng Standard",
      description: "Phòng tiện nghi cơ bản",
      price: 50,
      stock: 10,
      image_url: null,
      city_id: cities[1].id,
      user_id: users[1].id,
      category_id: categories[1].id,
      createdAt: now,
      updatedAt: now,
    },
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("rooms", null, {});
}
