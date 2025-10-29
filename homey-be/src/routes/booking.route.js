import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../database/models/index.js";
import { jwt } from "../middlewares/auth.js"; // ✅ dùng middleware

const router = express.Router();

// ✅ Chỉ cho user đăng nhập mới đặt phòng
router.post("/", jwt(), async (req, res) => {
    try {
        const { room_id, start_date, end_date, quantity, total_price } = req.body;

        if (!room_id || !start_date || !end_date) {
            return res.status(400).json({ error: "Thiếu thông tin đặt phòng" });
        }

        // ✅ Lấy user_id từ token JWT
        const user_id = req.user?.id || req.user?.sub;
        if (!user_id) {
            return res.status(401).json({ error: "Không xác định được người dùng" });
        }

        const newBooking = await db.Booking.create({
            id: uuidv4(),
            user_id, // ✅ luôn có
            room_id,
            start_date,
            end_date,
            quantity: quantity || 1,
            total_price,
            status: "confirmed",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({
            message: "✅ Đặt phòng thành công!",
            data: newBooking,
        });
    } catch (error) {
        console.error("❌ Lỗi khi tạo booking:", error);
        res.status(500).json({ error: "Lỗi server khi tạo đơn đặt phòng" });
    }
});

export default router;
