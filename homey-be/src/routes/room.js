// import { Router } from "express";
// import RoomController from "../controllers/room.controller.js";

// const router = Router();
// const controller = new RoomController();

// // Public routes: ai cũng xem được
// router.get("/", controller.getAll.bind(controller));
// router.get("/:id", controller.getById.bind(controller));

// export default router;

import express from "express";
import {
    getAllRooms,
    getRoomsByCategory,
    getRoomById,
    getRoomDetailById,
} from "../controllers/room.controller.js";

const router = express.Router();


router.get("/room-detail/:id", getRoomDetailById);
router.get("/category/:categoryId", getRoomsByCategory);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);

export default router;





