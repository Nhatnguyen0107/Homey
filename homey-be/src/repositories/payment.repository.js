import { Op } from "sequelize";
import db from "../database/models/index.js";

class PaymentRepository {
    constructor() {
        this.model = db.Payment;
    }

    async getAllPayments(req) {
        try {
            const {
                page = 1,
                pageSize = 8,
                search = "",
                sortField = "createdAt",
                sortOrder = "DESC",
            } = req.query;

            const limit = Math.max(parseInt(pageSize, 10), 1);
            const offset = (Math.max(parseInt(page, 10), 1) - 1) * limit;

            // escape search để tránh SQL injection
            const searchValue = search ? `%${search}%` : null;

            // Build điều kiện tìm kiếm
            const searchCondition = searchValue
                ? `AND (u.userName LIKE ${db.sequelize.escape(searchValue)} 
                        OR r.name LIKE ${db.sequelize.escape(searchValue)} 
                        OR p.method LIKE ${db.sequelize.escape(searchValue)})`
                : "";

            // Count total records
            const [countResult] = await db.sequelize.query(`
                SELECT COUNT(*) as total
                FROM payments p
                LEFT JOIN bookings b ON p.booking_id = b.id
                LEFT JOIN users u ON b.user_id = u.id
                LEFT JOIN rooms r ON b.room_id = r.id
                WHERE 1=1 ${searchCondition}
            `);
            const total = countResult[0]?.total || 0;

            // Get paginated data
            const [payments] = await db.sequelize.query(`
                SELECT 
                    p.id,
                    p.booking_id,
                    p.method,
                    p.amount,
                    p.status,
                    p.createdAt,
                    p.updatedAt,
                    u.userName AS userName,
                    r.name AS roomName
                FROM payments p
                LEFT JOIN bookings b ON p.booking_id = b.id
                LEFT JOIN users u ON b.user_id = u.id
                LEFT JOIN rooms r ON b.room_id = r.id
                WHERE 1=1 ${searchCondition}
                ORDER BY p.${sortField} ${sortOrder}
                LIMIT ${limit} OFFSET ${offset}
            `);

            return {
                data: payments,
                pagination: {
                    total: parseInt(total),
                    page: parseInt(page),
                    pageSize: limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            throw new Error("Error fetching payments: " + error.message);
        }
    }

    async getPaymentById(id) {
        return await this.model.findOne({ where: { id } });
    }

    async createPayment(data) {
        return await this.model.create(data);
    }

    async editPayment(id, data) {
        return await this.model.update(data, { where: { id } });
    }

    async deletePayment(id) {
        return await this.model.destroy({ where: { id } });
    }
}

export default PaymentRepository;