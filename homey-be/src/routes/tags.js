import { Router } from "express";
import TagsController from "../controllers/tags.controller.js";

const controller = new TagsController();
const router = Router();
// define the about route
router.get("/", controller.getAllTags);
router.post("/", controller.createTag);
router.delete("/:id", controller.deleteTag);
router.get("/:id", controller.getTagById);
router.put("/:id", controller.editTag);

export default router;
