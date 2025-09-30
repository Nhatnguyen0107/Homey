import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface, Sequelize) {
  const now = new Date();

  const users = await queryInterface.sequelize.query(`SELECT id FROM users`, {
    type: Sequelize.QueryTypes.SELECT,
  });
  const products = await queryInterface.sequelize.query(
    `SELECT id, price FROM products`,
    { type: Sequelize.QueryTypes.SELECT }
  );

  const orders = [];
  const items = [];

  for (let i = 0; i < 15; i++) {
    const orderId = uuidv4();
    const user = faker.helpers.arrayElement(users);
    const status = faker.helpers.arrayElement([
      "pending",
      "paid",
      "shipped",
      "completed",
      "cancelled",
    ]);
    let total = 0;

    const itemCount = faker.number.int({ min: 1, max: 5 });
    for (let j = 0; j < itemCount; j++) {
      const p = faker.helpers.arrayElement(products);
      const qty = faker.number.int({ min: 1, max: 3 });
      const price = Number(p.price); // dùng price của product là hợp lý nhất
      total += price * qty;

      items.push({
        id: uuidv4(),
        orderId,
        productId: p.id,
        quantity: qty,
        price,
        createdAt: now,
        updatedAt: now,
      });
    }

    orders.push({
      id: orderId,
      userId: user.id,
      status,
      total: total.toFixed(2),
      createdAt: now,
      updatedAt: now,
    });
  }

  await queryInterface.bulkInsert("orders", orders, {});
  await queryInterface.bulkInsert("order_items", items, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("order_items", null, {});
  await queryInterface.bulkDelete("orders", null, {});
}
