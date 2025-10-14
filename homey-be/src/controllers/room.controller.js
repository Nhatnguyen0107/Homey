// import db from "../database/models/index.js";

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

