import CategoryService from "../services/category.service.js";
import BaseController from "./base.controller.js";
import multer from "multer";
import path from "path";

// === Cấu hình lưu file ảnh ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/categories"); // tạo thư mục nếu chưa có
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
export const upload = multer({ storage });

class CategoryController extends BaseController {
  constructor() {
    super();
    this.service = new CategoryService();
  }

  // Lấy tất cả categories
  async getAllCategories(req, res) {
    try {
      const categories = await this.service.getAllCategories(req);
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Lấy theo id
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await this.service.getCategoryById(id);
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // === Thêm mới có upload ảnh ===
  async createCategory(req, res) {
    try {
      const data = req.body;
      if (req.file) {
        data.image_url = `/uploads/categories/${req.file.filename}`;
      }
      await this.service.createCategory(data);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // === Cập nhật có upload ảnh ===
  async editCategory(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (req.file) {
        data.image_url = `/uploads/categories/${req.file.filename}`;
      }
      await this.service.editCategory(id, data);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error editing category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await this.service.deleteCategory(id);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error deleting category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default CategoryController;
