import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";

class ProductRepository {
  constructor() {
    this.model = db.Product; // Initialize the Product model
  }

  async getAllProducts(req) {
    try {
      const {
        page = 1,
        pageSize = 5,
        search = "",
        sortField = "createdAt",
        sortOrder = "DESC",
      } = req.query;

      const limit = Math.max(parseInt(pageSize), 1);
      const offset = (Math.max(parseInt(page), 1) - 1) * limit;
      const count = await this.model.count({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        },
        include: [
          {
            model: db.Category,
            where: {
              name: { [Op.like]: `%${search}%` },
            },
          },
        ],
      });
      const rows = await db.sequelize.query(
        `
          SELECT p.id, p.name as productName, c.name as categoryName, c.id as categoryId, p.description, p.price, p.stock, p.imageUrls, p.createdAt, p.updatedAt
          FROM products as p
          INNER JOIN categories as c
          ON p.categoryId = c.id
          WHERE p.name LIKE $search or c.name LIKE $search
          ORDER BY ${sortField} ${sortOrder}
          LIMIT $offset, $limit
        `,
        {
          bind: {
            limit,
            offset,
            search: `%${search}%`,
          },
          type: QueryTypes.SELECT,
        }
      );
      return {
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          pageSize: limit,
          totalPages: Math.ceil(count / limit) || 1,
        },
      };
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  }

  async getProductById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw new Error("Error fetching product: " + error.message);
    }
  }

  async createProduct(productData) {
    try {
      return await this.model.create({
        ...productData,
        name: productData.productName,
      });
    } catch (error) {
      throw new Error("Error creating product: " + error.message);
    }
  }

  async updateProduct(id, productData) {
    try {
      const product = await this.getProductById(id);
      if (!product) throw new Error("Product not found");
      return await product.update({
        ...productData,
        name: productData.productName,
      });
    } catch (error) {
      throw new Error("Error updating product: " + error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.getProductById(id);
      if (!product) throw new Error("Product not found");
      return await product.destroy();
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  }
}

export default ProductRepository;
