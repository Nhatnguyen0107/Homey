import { Router } from "express";
import RoomController from "../controllers/room.controller.js";

const controller = new RoomController();
const router = Router();
// define the about route
router.get("/", controller.getAllRooms);
router.post("/", controller.createRoom);
router.delete("/:id", controller.deleteRoom);
router.get("/:id", controller.getRoomById);
router.put("/:id", controller.editRoom);
router.get("/room-detail/:id", controller.getRoomDetailById);
router.get("/category/:categoryId", controller.getRoomsByCategory);

export default router;
