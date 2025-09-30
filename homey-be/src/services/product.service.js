import ProductRepository from "../repositories/product.repository.js";

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async getListProducts(req) {
    try {
      return await this.repository.getAllProducts(req);
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  }
  async getProductById(id) {
    try {
      return await this.repository.getProductById(id);
    } catch (error) {
      throw new Error("Error fetching product: " + error.message);
    }
  }

  async createProduct(productData) {
    try {
      return await this.repository.createProduct(productData);
    } catch (error) {
      throw new Error("Error creating product: " + error.message);
    }
  }

  async updateProduct(id, productData) {
    try {
      return await this.repository.updateProduct(id, productData);
    } catch (error) {
      throw new Error("Error updating product: " + error.message);
    }
  }

  async deleteProduct(id) {
    try {
      return await this.repository.deleteProduct(id);
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  }
}

export default ProductService;
