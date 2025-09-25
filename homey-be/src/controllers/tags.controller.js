<<<<<<< HEAD
import CategoryService from "../services/category.service.js";
import BaseController from "./base.controller.js";

class TagsController extends BaseController {
    constructor() {
        super();
        this.service = new TagsService();
    }

    async getAllTags(req, res) {
        try {
            const tags = await this.service.getAllTags(req);
            res.json(tags);
        } catch (error) {
            console.error("Error fetching tags:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

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

    async createCategory(req, res) {
        try {
            const data = req.body;
            await this.service.createCategory(data);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error creating category:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async editCategory(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await this.service.editCategory(id, data);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error creating category:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            await this.service.deleteCategory(id);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error dalete category:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default TagsController;
=======
import BaseController from "./base.controller.js";
import TagsService from "../services/tags.service.js";

class TagsController extends BaseController {
  constructor() {
    super();
    this.service = new TagsService();
  }

  async getAllTags(req, res) {
    try {
      const tags = await this.service.getAllTags(req);
      res.json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTagById(req, res) {
    try {
      const { id } = req.params;
      const tag = await this.service.getTagById(id);
      res.json(tag);
    } catch (error) {
      console.error("Error fetching tag:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createTag(req, res) {
    try {
      const data = req.body;
      await this.service.createTag(data);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating tag:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async editTag(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      await this.service.editTag(id, data);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating tag:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteTag(req, res) {
    try {
      const { id } = req.params;
      await this.service.deleteTag(id);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error dalete tag:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default TagsController;
>>>>>>> main
