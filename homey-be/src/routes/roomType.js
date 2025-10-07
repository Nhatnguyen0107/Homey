import express from "express";
import db from "../database/models/index.js";

const router = express.Router();

// Lấy toàn bộ loại phòng
router.get("/", async (req, res) => {
    console.log("db.RoomType:", db.RoomType);

    try {
        const roomTypes = await db.RoomType.findAll();
        res.json(roomTypes);


    } catch (error) {
        console.error("Lỗi khi lấy loại phòng:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

export default router;
