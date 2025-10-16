import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { getExpiresAtFromToken } from "../helpers/jwt.js";

class RoomRepository {
    constructor() {
        this.model = db.Room; // Initialize the User model
    }

    async getAllRooms(req) {
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

            // Đếm tổng số user thỏa điều kiện search
            const count = await this.model.count({
                where: {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
            });

            // Lấy danh sách user
            const rows = await db.sequelize.query(
                `
          SELECT id, name, description, price, image_url, stock, createdAt, updatedAt
          FROM rooms
          WHERE name LIKE $search
          ORDER BY ${sortField} ${sortOrder}
          LIMIT $limit OFFSET $offset
        `,
                {
                    bind: {
                        limit,
                        offset,
                        search: `%${search}%`,
                    },
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
            throw new Error("Error fetching rooms: " + error.message);
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
