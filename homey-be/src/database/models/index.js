import AppConfig from "../../config/index.js";
import Sequelize from "sequelize";

import userModel from "./user.model.js";
import profileModel from "./profile.model.js";
import categoryModel from "./category.model.js";
import productModel from "./product.model.js";
import orderModel from "./order.model.js";
import orderItemModel from "./orderItem.model.js";
import roleModel from "./role.model.js";
import refreshTokenModel from "./refreshToken.model.js";
import tagModel from "./tag.model.js";
import productTagModel from "./productTag.model.js";
import userRoleModel from "./userRole.model.js";

const sequelize = new Sequelize(AppConfig.database.url, {
  dialect: AppConfig.database.dialect, // ✅ Rất quan trọng!
  pool: AppConfig.database.pool,
});

const db = {
  sequelize,
  User: userModel(sequelize),
  Profile: profileModel(sequelize),
  Category: categoryModel(sequelize),
  Product: productModel(sequelize),
  Order: orderModel(sequelize),
  OrderItem: orderItemModel(sequelize),
  Role: roleModel(sequelize),
  RefreshToken: refreshTokenModel(sequelize),
  Tag: tagModel(sequelize),
  ProductTag: productTagModel(sequelize),
  UserRole: userRoleModel(sequelize),
};

// Gọi associate cho tất cả models
Object.values(db).forEach((model) => {
  if (model?.associate) {
    model.associate(db);
  }
});

export default db;
