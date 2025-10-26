import ProductService from "../services/booking.service.js";
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

    async getBookingById(req, res) {
        try {
            const { id } = req.params;
            const booking = await this.service.getBookingById(id);
            res.json(booking);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async createBooking(req, res) {
        try {
            const bookingData = req.body;
            await this.service.createProduct(bookingData);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error creating booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async updateBooking(req, res) {
        try {
            const { id } = req.params;
            const bookingData = req.body;
            await this.service.updateBooking(id, bookingData);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error creating booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteBooking(req, res) {
        try {
            const { id } = req.params;
            await this.service.deleteBooking(id);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error creating booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default BookingController;
