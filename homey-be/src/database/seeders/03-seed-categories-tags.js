import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const now = new Date();

  const categories = [
    { id: uuidv4(), name: "Quần áo trẻ em", createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Giày dép", createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Đồ chơi", createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Sách thiếu nhi", createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Đồ dùng học tập", createdAt: now, updatedAt: now },
  ];

  const tags = [
    { id: uuidv4(), name: "Hàng mới về", createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Giảm giá", createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Bán chạy", createdAt: now, updatedAt: now },
    { id: uuidv4(), name: "Dễ thương", createdAt: now, updatedAt: now },
  ];

  await queryInterface.bulkInsert("categories", categories, {});
  await queryInterface.bulkInsert("tags", tags, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("tags", null, {});
  await queryInterface.bulkDelete("categories", null, {});
}
