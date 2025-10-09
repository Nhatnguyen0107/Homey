import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";

class CategoryRepository {
  constructor() {
    this.model = db.Category; // Initialize the Product model
  }

  async getAllCategories(req) {
    try {
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  }

  // async getCategoryById(id) {
  //   try {
  //     return await this.model.findByPk(id);
  //   } catch (error) {
  //     throw new Error("Error fetching category: " + error.message);
  //   }
  // }

  // async createCategory(data) {
  //   try {
  //     return await this.model.create(data);
  //   } catch (error) {
  //     throw new Error("Error creating product: " + error.message);
  //   }
  // }

  // async editCategory(id, data) {
  //   try {
  //     const category = await this.getCategoryById(id);
  //     if (!category) throw new Error("Category not found");
  //     return await category.update({
  //       name: data.name,
  //     });
  //   } catch (error) {
  //     throw new Error("Error updating category: " + error.message);
  //   }
  // }

  // async deleteCategory(id) {
  //   try {
  //     const category = await this.getCategoryById(id);
  //     if (!category) throw new Error("Category not found");
  //     return await category.destroy();
  //   } catch (error) {
  //     throw new Error("Error deleting category: " + error.message);
  //   }
  // }
}

export default CategoryRepository;
