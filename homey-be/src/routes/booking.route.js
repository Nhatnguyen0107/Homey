
import { Router } from "express";
import BookingController from "../controllers/booking.controller.js";

const controller = new BookingController();
const router = Router();
// define the about route
router.get("/", controller.getAllBookings);
// router.post("/", controller.createBookings);
// router.delete("/:id", controller.deleteBookings);
// router.get("/:id", controller.getBookingsById);
// router.put("/:id", controller.editBookings);

export default router;