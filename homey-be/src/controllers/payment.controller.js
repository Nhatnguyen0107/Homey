import db from "../database/models/index.js";
const { Bookings, Payments } = db;

export default class PaymentController {
    // ✅ API: POST /api/v1/payments
    async createPayment(req, res) {
        try {
            const { booking_id, amount, method, status } = req.body;

            const payment = await db.Payment.create({
                booking_id,
                amount,
                method,
                status,
            });

            return res.status(201).json({ message: "Thanh toán thành công!", data: payment });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server khi thanh toán" });
        }
    }

    // ✅ API: POST /api/v1/payments/mock
    async mockPayment(req, res) {
        try {
            const { user_id, room_id, start_date, end_date, total_price } = req.body;

            const booking = await Bookings.create({
                user_id,
                room_id,
                start_date,
                end_date,
                quantity: 1,
                total_price,
                status: "confirmed",
            });

            const payment = await Payments.create({
                booking_id: booking.id,
                method: "Credit Card (Demo)",
                amount: total_price,
                status: "paid",
            });

            return res.json({
                success: true,
                bookingId: booking.id,
                paymentId: payment.id,
            });
        } catch (err) {
            console.error("mockPayment error:", err);
            return res.status(500).json({ success: false, message: "Lỗi server" });
        }
    }

    //  API: GET /api/v1/payments/status/:bookingId
    async getStatus(req, res) {
        try {
            const { bookingId } = req.params;
            const payment = await Payments.findOne({ where: { booking_id: bookingId } });
            if (!payment) return res.json({ paid: false });
            return res.json({ paid: payment.status === "paid" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ paid: false });
        }
    }
}
