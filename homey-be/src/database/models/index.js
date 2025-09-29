import AppConfig from "../../config/index.js";
import Sequelize from "sequelize";

import userModel from "./user.model.js";
import categoryModel from "./category.model.js";
import promotionModel from "./promotion.model.js";
import cityModel from "./city.model.js";
import roomModel from "./room.model.js";
import bookingModel from "./booking.model.js";
import reviewModel from "./review.model.js";


const sequelize = new Sequelize(AppConfig.database.url, {
  dialect: AppConfig.database.dialect, // ✅ Rất quan trọng!
  pool: AppConfig.database.pool,
});

const db = {
  sequelize,
  User: userModel(sequelize),
  Category: categoryModel(sequelize),
  Promotion: promotionModel(sequelize),
  City: cityModel(sequelize),
  Room: roomModel(sequelize),
  Booking: bookingModel(sequelize),
  Review: reviewModel(sequelize),
};

// Gọi associate cho tất cả models
Object.values(db).forEach((model) => {
  if (model?.associate) {
    model.associate(db);
  }
});

export default db;
