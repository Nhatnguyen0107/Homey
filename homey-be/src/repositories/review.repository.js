import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { getExpiresAtFromToken } from "../helpers/jwt.js";

class ReviewRepository {
    constructor() {
        this.model = db.Review; // Initialize the User model
    }

    async getAllReviews(req) {
        try {
            const {
                page = 1,
                pageSize = 5,
                search = "",
                sortField = "createdAt",
                sortOrder = "DESC",
            } = req.query;

            const limit = Math.max(parseInt(pageSize), 1);
            const offset = (Math.max(parseInt(page), 1) - 1) * limit;

            // Count tổng số review
            const count = await this.model.count({
                where: {
                    comment: {
                        [Op.like]: `%${search}%`,
                    },
                },
            });

            // Query join user và room
            const rows = await db.sequelize.query(
                `
            SELECT r.id, r.rating, r.comment, r.createdAt, r.updatedAt,
                   u.userName AS user_name,
                   rm.name AS room_name
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            JOIN rooms rm ON r.room_id = rm.id
            WHERE r.comment LIKE :search
            ORDER BY ${sortField} ${sortOrder}
            LIMIT :limit OFFSET :offset
            `,
                {
                    replacements: { search: `%${search}%`, limit, offset },
                    type: QueryTypes.SELECT,
                }
            );

            return {
                data: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    pageSize: limit,
                    totalPages: Math.ceil(count / limit) || 1,
                },
            };
        } catch (error) {
            throw new Error("Error fetching reviews: " + error.message);
        }
    }


    async getReviewById(id) {
        try {
            const review = await this.model.findByPk(id);
            if (!review) throw new Error("Review not found");
            return review;
        } catch (error) {
            throw new Error("Error fetching Reviews: " + error.message);
        }
    }

    async createReviews(data) {
        try {
            const id = uuidv4();
            const newReview = await this.model.create({
                id,
                rating: data.rating,
                comment: data.comment,
                room_id: data.room_id,
                user_id: data.user_id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return newReview;
        } catch (error) {
            throw new Error("Error creating review: " + error.message);
        }
    }

    async updateReviews(id, data) {
        try {
            const review = await this.model.findByPk(id);
            if (!review) throw new Error("Review not found");

            const updatedReview = await review.update({
                rating: data.rating ?? review.rating,
                comment: data.comment ?? review.comment,
                room_id: data.room_id ?? review.room_id,
                user_id: data.user_id ?? review.user_id,
            });

            return updatedReview;
        } catch (error) {
            throw new Error("Error updating review: " + error.message);
        }
    }

    async deleteReviews(id) {
        try {
            const review = await this.model.findByPk(id); // lấy instance model trực tiếp
            if (!review) throw new Error("Review not found");

            await review.destroy(); // xóa Reviews
            return { success: true, message: "Review deleted successfully" };
        } catch (error) {
            throw new Error("Error deleting Review: " + error.message);
        }
    }
}

export default ReviewRepository;