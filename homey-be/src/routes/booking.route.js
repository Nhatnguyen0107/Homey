import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../database/models/index.js";

const router = express.Router();

// ✅ Bỏ kiểm tra đăng nhập — cho phép ai cũng đặt phòng
router.post("/", async (req, res) => {
    try {
        const { room_id, start_date, end_date, quantity, total_price, user_id } = req.body;

        if (!room_id || !start_date || !end_date) {
            return res.status(400).json({ error: "Thiếu thông tin đặt phòng" });
        }

        // ⚙️ user_id có thể là null hoặc bạn cho nhập tạm (để test)
        const newBooking = await db.Booking.create({
            id: uuidv4(),
            user_id: user_id || null, // cho phép null
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
