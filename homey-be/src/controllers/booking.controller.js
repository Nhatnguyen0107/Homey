import BookingService from "../services/booking.service.js";
import BaseController from "./base.controller.js";

class BookingController extends BaseController {
    constructor() {
        super();
        this.service = new BookingService();
    }

    async getAllBookings(req, res) {
        try {
            const bookings = await this.service.getAllBookings(req);
            res.json(bookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // async getBookingById(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const booking = await this.service.getBookingById(id);
    //         res.json(booking);
    //     } catch (error) {
    //         console.error("Error fetching bookings:", error);
    //         return res.status(500).json({ error: "Internal Server Error" });
    //     }
    // }

    //  Tạo booking mới (user đặt phòng)
    async createBooking(req, res) {
        try {
            const user_id = req.user?.id; // lấy user từ token (auth middleware)
            const { room_id, start_date, end_date, quantity, total_price } = req.body;

            // async updateBooking(req, res) {
            //     try {
            //         const { id } = req.params;
            //         const bookingData = req.body;
            //         await this.service.updateBooking(id, bookingData);
            //         return res.status(200).json({ status: true });
            //     } catch (error) {
            //         console.error("Error creating booking:", error);
            //         return res.status(500).json({ error: "Internal Server Error" });
            //     }
            // }

            // Bỏ yêu cầu bắt buộc total_price — frontend có thể gửi, nếu không backend vẫn xử lý
            if (!room_id || !start_date || !end_date || !quantity) {
                return res.status(400).json({ error: "Thiếu thông tin đặt phòng" });
            }

            // Nếu backend cần tính tổng tiền tự động, tốt hơn nên gọi service để lấy giá phòng và tính.
            const finalTotalPrice = total_price ?? 0;

            const newBooking = await this.service.createBooking({
                user_id,
                room_id,
                start_date,
                end_date,
                quantity,
                total_price: finalTotalPrice,
            });

            return res.status(201).json({
                success: true,
                message: "Đặt phòng thành công!",
                data: newBooking,
            });
        } catch (error) {
            console.error("Error creating booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // 📋 Lấy danh sách đặt phòng của người dùng hiện tại
    async getUserBookings(req, res) {
        try {
            const user_id = req.user?.id;
            if (!user_id) return res.status(401).json({ error: "Unauthorized" });

            const bookings = await this.service.getBookingsByUserId(user_id);
            return res.status(200).json({
                success: true,
                data: bookings,
            });
        } catch (error) {
            console.error("Error fetching user bookings:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // ❌ Hủy đặt phòng (user hoặc admin)
    async cancelBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await this.service.cancelBooking(id);
            return res.status(200).json({
                success: true,
                message: "Đã hủy đặt phòng thành công",
                data: booking,
            });
        } catch (error) {
            console.error("Error cancelling booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // ✅ Xác nhận đặt phòng (admin)
    async confirmBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await this.service.updateStatus(id, "confirmed");
            return res.status(200).json({
                success: true,
                message: "Đơn đặt phòng đã được xác nhận",
                data: booking,
            });
        } catch (error) {
            console.error("Error confirming booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // ✅ Đánh dấu hoàn thành (admin)
    async completeBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await this.service.updateStatus(id, "completed");
            return res.status(200).json({
                success: true,
                message: "Đơn đặt phòng đã hoàn tất",
                data: booking,
            });
        } catch (error) {
            console.error("Error completing booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default BookingController;
