<<<<<<< HEAD
import CategoryRepository from "../repositories/category.repository.js";

class TagsService {
    constructor() {
        this.repository = new CategoryRepository();
    }

    async getAllTags(req) {
        try {
            return await this.repository.getAllTags(req);
        } catch (error) {
            throw new Error("Error fetching tags: " + error.message);
        }
    }
    async getCategoryById(id) {
        try {
            return await this.repository.getCategoryById(id);
        } catch (error) {
            throw new Error("Error fetching category: " + error.message);
        }
    }

    async createCategory(data) {
        try {
            return await this.repository.createCategory(data);
        } catch (error) {
            throw new Error("Error creating product: " + error.message);
        }
    }

    async editCategory(id, data) {
        try {
            return await this.repository.editCategory(id, data);
        } catch (error) {
            throw new Error("Error updating category: " + error.message);
        }
    }

    async deleteCategory(id) {
        try {
            return await this.repository.deleteCategory(id);
        } catch (error) {
            throw new Error("Error deleting category: " + error.message);
        }
    }
}

export default TagsService;
=======
import TagsRepository from "../repositories/tags.repository.js";

class TagsService {
  constructor() {
    this.repository = new TagsRepository();
  }

  async getAllTags(req) {
    try {
      return await this.repository.getAllTags(req);
    } catch (error) {
      throw new Error("Error fetching tags: " + error.message);
    }
  }
  async getTagById(id) {
    try {
      return await this.repository.getTagById(id);
    } catch (error) {
      throw new Error("Error fetching tag: " + error.message);
    }
  }

  async createTag(data) {
    try {
      return await this.repository.createTag(data);
    } catch (error) {
      throw new Error("Error creating product: " + error.message);
    }
  }

  async editTag(id, data) {
    try {
      return await this.repository.editTag(id, data);
    } catch (error) {
      throw new Error("Error updating tag: " + error.message);
    }
  }

  async deleteTag(id) {
    try {
      return await this.repository.deleteTag(id);
    } catch (error) {
      throw new Error("Error deleting tag: " + error.message);
    }
  }
}

export default TagsService;
>>>>>>> main
