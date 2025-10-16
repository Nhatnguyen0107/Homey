// src/controllers/room.controller.js
import RoomService from "../services/room.service.js";
import BaseController from "./base.controller.js";

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

    async getRoomById(req, res) {
        try {
            const { id } = req.params;
            const room = await this.service.getRoomById(id);
            res.json(room);
        } catch (error) {
            console.error("Error fetching room:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async createRoom(req, res) {
        try {
            const data = req.body;
            await this.service.createRoom(data);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error creating room:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async editRoom(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await this.service.editRoom(id, data);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error creating room:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteRoom(req, res) {
        try {
            const { id } = req.params;
            await this.service.deleteRoom(id);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error dalete room:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getRoomDetailById(req, res) {
        try {
            const result = await roomService.getRoomDetailById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRoomsByCategory(req, res) {
        try {
            const result = await roomService.getRoomsByCategory(req.params.categoryId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default RoomController;
