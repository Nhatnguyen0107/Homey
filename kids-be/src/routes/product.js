import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const controller = new ProductController();
const router = Router();
// define the about route
router.get("/", controller.getListProducts);
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);
router.get("/:id", controller.getProductById);

export default router;
