import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface, Sequelize) {
  const now = new Date();
  const categories = await queryInterface.sequelize.query(
    `SELECT id FROM categories`,
    { type: Sequelize.QueryTypes.SELECT }
  );
  const products = [];

  for (let i = 0; i < 20; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    products.push({
      id: uuidv4(),
      categoryId: cat.id,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 50000, max: 700000 }),
      stock: faker.number.int({ min: 0, max: 100 }),
      imageUrls: JSON.stringify([
        { url: faker.image.url() },
        { url: faker.image.url() },
        { url: faker.image.url() },
        { url: faker.image.url() },
        { url: faker.image.url() },
      ]),
      createdAt: now,
      updatedAt: now,
    });
  }
  await queryInterface.bulkInsert("products", products, {});

  // gán tags ngẫu nhiên
  const tags = await queryInterface.sequelize.query(`SELECT id FROM tags`, {
    type: Sequelize.QueryTypes.SELECT,
  });
  const productTags = [];
  products.forEach((p) => {
    const count = Math.floor(Math.random() * 3) + 1; // 1-3 tag
    const chosen = faker.helpers.arrayElements(tags, count);
    chosen.forEach((t) =>
      productTags.push({
        productId: p.id,
        tagId: t.id,
        createdAt: now,
        updatedAt: now,
      })
    );
  });
  await queryInterface.bulkInsert("product_tags", productTags, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("product_tags", null, {});
  await queryInterface.bulkDelete("products", null, {});
}
