import RoomService from "../services/room.service.js";
import BaseController from "./base.controller.js";

<<<<<<< HEAD
class RoomController extends BaseController {
    constructor() {
        super();
        this.service = new RoomService();
    }

    async getAllRooms(req, res) {
        try {
            const rooms = await this.service.getAllRooms(req);
            res.json(rooms);
        } catch (error) {
            console.error("Error fetching Rooms:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // async getCategoryById(req, res) {
    //   try {
    //     const { id } = req.params;
    //     const category = await this.service.getCategoryById(id);
    //     res.json(category);
    //   } catch (error) {
    //     console.error("Error fetching category:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }

    // async createCategory(req, res) {
    //   try {
    //     const data = req.body;
    //     await this.service.createCategory(data);
    //     return res.status(200).json({ status: true });
    //   } catch (error) {
    //     console.error("Error creating category:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }

    // async editCategory(req, res) {
    //   try {
    //     const { id } = req.params;
    //     const data = req.body;
    //     await this.service.editCategory(id, data);
    //     return res.status(200).json({ status: true });
    //   } catch (error) {
    //     console.error("Error creating category:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }

    // async deleteCategory(req, res) {
    //   try {
    //     const { id } = req.params;
    //     await this.service.deleteCategory(id);
    //     return res.status(200).json({ status: true });
    //   } catch (error) {
    //     console.error("Error dalete category:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }
}

export default RoomController;
=======
// export default class RoomController {
//     async getAll(req, res) {
//         try {
//             const rooms = await db.Room.findAll();
//             res.json(rooms);
//         } catch (error) {
//             console.error("Lỗi getAll rooms:", error);
//             res.status(500).json({ message: "Lỗi server" });
//         }
//     }

//     async getById(req, res) {
//         try {
//             const { id } = req.params;
//             const room = await db.Room.findByPk(id);
//             if (!room) {
//                 return res.status(404).json({ message: "Không tìm thấy phòng" });
//             }
//             res.json(room);
//         } catch (error) {
//             console.error("Lỗi getById room:", error);
//             res.status(500).json({ message: "Lỗi server" });
//         }
//     }
// }
import db from "../database/models/index.js";

// ✅ Lấy tất cả phòng
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await db.Room.findAll();
        res.json(rooms);
    } catch (error) {
        console.error("Lỗi lấy danh sách phòng:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// ✅ Lấy phòng theo category_id
export const getRoomsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const rooms = await db.Room.findAll({
            where: { category_id: categoryId },
        });
        res.json(rooms);
    } catch (error) {
        console.error("Lỗi lấy phòng theo category:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// ✅ Lấy phòng theo Room.id
export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await db.Room.findOne({
            where: { id },
            include: [
                {
                    model: db.RoomDetail,
                    as: "detail",
                    attributes: ["room_name", "price", "description", "images", "rating"],
                },
            ],
        });

        if (!room) {
            return res.status(404).json({ message: "Không tìm thấy phòng" });
        }

        res.json(room);
    } catch (error) {
        console.error("Lỗi lấy chi tiết phòng:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};


export const getRoomDetailById = async (req, res) => {
    try {
        const { id } = req.params; // id này là id của bảng rooms

        // Tìm chi tiết phòng dựa vào room_id
        const roomDetail = await db.RoomDetail.findOne({
            where: { room_id: id },
            include: [
                {
                    model: db.Room,
                    as: "room",
                    attributes: ["id", "name", "description", "price", "image_url"],
                },
            ],
        });

        if (!roomDetail) {
            return res.status(404).json({ message: "Không tìm thấy chi tiết phòng" });
        }

        res.status(200).json(roomDetail);
    } catch (error) {
        console.error("❌ Lỗi lấy chi tiết phòng:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
};

>>>>>>> nguyenthien
