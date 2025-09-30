import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const now = new Date();
  const password = await bcrypt.hash("123456", 10);

  // Tạo 1 admin + 9 customer
  const users = [];
  const profiles = [];

  const adminId = uuidv4();
  users.push({
    id: adminId,
    name: "Admin",
    email: "admin@kidshop.com",
    passwordHash: password,
    createdAt: now,
    updatedAt: now,
  });
  profiles.push({
    id: uuidv4(),
    userId: adminId,
    address: "123 Admin Street",
    phone: "0123456789",
    dateOfBirth: "1990-01-01",
    avatarUrl: null,
    createdAt: now,
    updatedAt: now,
  });

  for (let i = 0; i < 9; i++) {
    const id = uuidv4();
    users.push({
      id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      passwordHash: password,
      createdAt: now,
      updatedAt: now,
    });
    profiles.push({
      id: uuidv4(),
      userId: id,
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date.birthdate({ min: 1985, max: 2007, mode: "year" }),
      avatarUrl: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  await queryInterface.bulkInsert("users", users, {});
  await queryInterface.bulkInsert("profiles", profiles, {});

  // map role
  const roles = await queryInterface.sequelize.query(
    `SELECT id, name FROM roles`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  const adminRole = roles.find((r) => r.name === "admin");
  const customerRole = roles.find((r) => r.name === "customer");

  const userRoles = [];
  userRoles.push({
    userId: adminId,
    roleId: adminRole.id,
    createdAt: now,
    updatedAt: now,
  });
  users
    .filter((u) => u.id !== adminId)
    .forEach((u) =>
      userRoles.push({
        userId: u.id,
        roleId: customerRole.id,
        createdAt: now,
        updatedAt: now,
      })
    );

  await queryInterface.bulkInsert("user_roles", userRoles, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("user_roles", null, {});
  await queryInterface.bulkDelete("profiles", null, {});
  await queryInterface.bulkDelete("users", null, {});
}
