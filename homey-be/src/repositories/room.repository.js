// src/repositories/room.repository.js
import { Op } from "sequelize";
import db from "../database/models/index.js";

class RoomRepository {
    constructor() {
        this.model = db.Room;
    }

    async getAllRooms(req) {
        try {
            // Ép kiểu và fallback giá trị mặc định
            const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
            const pageSize = Number(req.query.pageSize) > 0 ? Number(req.query.pageSize) : 6;
            const search = req.query.search ? String(req.query.search).trim() : "";
            const sortField = req.query.sortField || "createdAt";
            const sortOrder = req.query.sortOrder || "DESC";

            const limit = pageSize;
            const offset = (page - 1) * limit;

            // Xác thực sortField, sortOrder
            const validSortFields = ["createdAt", "name", "price"];
            const validSortOrders = ["ASC", "DESC"];
            const safeSortField = validSortFields.includes(sortField) ? sortField : "createdAt";
            const safeSortOrder = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : "DESC";

            // Truy vấn dữ liệu
            const { count, rows } = await this.model.findAndCountAll({
                // ⚠️ bỏ điều kiện where & include đi để test
                order: [[safeSortField, safeSortOrder]],
                limit,
                offset,
                attributes: ["id", "name", "description", "price", "image_url", "createdAt", "updatedAt"],
            });

            // Xử lý image_url dạng JSON
            const data = rows.map((r) => {
                const room = r.toJSON ? r.toJSON() : r;
                if (room.image_url && typeof room.image_url === "string") {
                    try {
                        room.image_url = JSON.parse(room.image_url);
                    } catch (e) {
                        room.image_url = [room.image_url];
                    }
                }
                return room;
            });

            return {
                data,
                pagination: {
                    total: count,
                    page,
                    pageSize: limit,
                    totalPages: Math.max(1, Math.ceil(count / limit)),
                },
            };
        } catch (error) {
            console.error("RoomRepository Error:", error);
            throw new Error("Error fetching rooms: " + (error.message || error));
        }
    }

    async getRoomById(id) {
        try {
            return await this.model.findByPk(id);
        } catch (error) {
            throw new Error("Error fetching room: " + error.message);
        }
    }

    async createRoom(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            console.error("❌ Error creating room:", error);
            throw new Error("Error creating room: " + error.message);
        }
    }

    async editRoom(id, data) {
        try {
            const room = await this.getRoomById(id);
            if (!room) throw new Error("Room not found");
            return await room.update({
                name: data.name,
            });
        } catch (error) {
            throw new Error("Error updating room: " + error.message);
        }
    }

    async deleteRoom(id) {
        try {
            const room = await this.getRoomById(id);
            if (!room) throw new Error("Room not found");
            return await room.destroy();
        } catch (error) {
            throw new Error("Error deleting room: " + error.message);
        }
    }

    //   async getUserByEmail(email, withPassword = false) {
    //     try {
    //       const user = withPassword
    //         ? await this.model.scope("withPassword").findOne({
    //             where: {
    //               email,
    //             },
    //           })
    //         : await this.model.findOne({
    //             where: {
    //               email,
    //             },
    //           });
    //       return user;
    //     } catch (error) {
    //       throw new Error("Error check user existed: " + error.message);
    //     }
    //   }

    //   async _updateOrCreateRefreshToken(user, token) {
    //     try {
    //       // Get expiresAt from JWT
    //       const expiresAt = getExpiresAtFromToken(token);

    //       if (user.RefreshToken) {
    //         await user.RefreshToken.update({
    //           userId: user.id,
    //           token,
    //           expiresAt,
    //         });
    //       } else {
    //         await user.createRefreshToken({ token, expiresAt });
    //       }
    //     } catch (error) {
    //       throw new Error("Error check user existed: " + error.message);
    //     }
    //   }
}

export default RoomRepository;
