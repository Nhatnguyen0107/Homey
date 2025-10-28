import { Router } from "express";
import Stripe from "stripe";
import Booking from "../database/models/bookings.model.js"; // giả sử bạn có model Booking
import { jwt } from "../middlewares/auth.js";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", jwt(), async (req, res) => {
    try {
        const { bookingId } = req.body;

        // Lấy booking info từ DB
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ error: "Booking không tồn tại" });

        // Tạo Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "vnd",
                        product_data: { name: booking.room_name },
                        unit_amount: booking.total_price * 100, // Stripe tính theo cent
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/success/${bookingId}`,
            cancel_url: `http://localhost:5173/cancel/${bookingId}`,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi tạo thanh toán" });
    }
});

export default router;
