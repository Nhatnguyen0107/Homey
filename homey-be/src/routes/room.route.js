import { Router } from "express";
import RoomController from "../controllers/room.controller.js";
// import middlewares from "../middlewares/index.js";

const controller = new RoomController();
const router = Router();
// define the about route
router.get("/", controller.getAllRooms);
router.post("/", controller.createRoom);
router.delete("/:id", controller.deleteRoom);
router.get("/:id", controller.getRoomById);
router.put("/:id", controller.editRoom);

export default router;

