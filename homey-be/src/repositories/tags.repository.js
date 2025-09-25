import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";

class TagsRepository {
<<<<<<< HEAD
    constructor() {
        this.model = db.Tag; // Initialize the Product model
    }

    async getAllTags(req) {
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
            });
            const rows = await db.sequelize.query(
                `
=======
  constructor() {
    this.model = db.Tag; // Initialize the Product model
  }

  async getAllTags(req) {
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
      });
      const rows = await db.sequelize.query(
        `
>>>>>>> main
          SELECT id, name, createdAt, updatedAt
          FROM tags
          WHERE name LIKE $search 
          ORDER BY ${sortField} ${sortOrder}
          LIMIT $offset, $limit
        `,
<<<<<<< HEAD
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
            throw new Error("Error fetching tags: " + error.message);
        }
    }

    async getCategoryById(id) {
        try {
            return await this.model.findByPk(id);
        } catch (error) {
            throw new Error("Error fetching category: " + error.message);
        }
    }

    async createCategory(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new Error("Error creating product: " + error.message);
        }
    }

    async editCategory(id, data) {
        try {
            const category = await this.getCategoryById(id);
            if (!category) throw new Error("Category not found");
            return await category.update({
                name: data.name,
            });
        } catch (error) {
            throw new Error("Error updating category: " + error.message);
        }
    }

    async deleteCategory(id) {
        try {
            const category = await this.getCategoryById(id);
            if (!category) throw new Error("Category not found");
            return await category.destroy();
        } catch (error) {
            throw new Error("Error deleting category: " + error.message);
        }
    }
}

export default TagsRepository;
=======
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
      throw new Error("Error fetching tags: " + error.message);
    }
  }

  async getTagById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw new Error("Error fetching tag: " + error.message);
    }
  }

  async createTag(data) {
    try {
      console.log("Creating tag with data:", data); // Debug log
      return await this.model.create(data);
    } catch (error) {
      throw new Error("Error creating product: " + error.message);
    }
  }

  async editTag(id, data) {
    try {
      const tag = await this.getTagById(id);
      if (!tag) throw new Error("Tag not found");
      return await tag.update({
        name: data.name,
      });
    } catch (error) {
      throw new Error("Error updating tag: " + error.message);
    }
  }

  async deleteTag(id) {
    try {
      const tag = await this.getTagById(id);
      if (!tag) throw new Error("Tag not found");
      return await tag.destroy();
    } catch (error) {
      throw new Error("Error deleting tag: " + error.message);
    }
  }
}

export default TagsRepository;
>>>>>>> main
