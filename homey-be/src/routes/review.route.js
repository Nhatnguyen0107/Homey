import { Router } from "express";
import ReviewController from "../controllers/review.controller.js";
// import middlewares from "../middlewares/index.js";

const controller = new ReviewController();
const router = Router();
// define the about route
router.get("/", controller.getAllReviews.bind(controller));
router.post("/", controller.createReviews.bind(controller));
router.delete("/:id", controller.deleteReviews.bind(controller));
router.get("/:id", controller.getReviewById.bind(controller));
router.put("/:id", controller.updateReviews.bind(controller));

export default router;