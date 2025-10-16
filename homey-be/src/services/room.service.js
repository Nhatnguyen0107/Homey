import RoomRepository from "../repositories/room.repository.js";

class RoomService {
    constructor() {
        this.repository = new RoomRepository();
    }

    async getAllRooms(req) {
        try {
            return await this.repository.getAllRooms(req);
        } catch (error) {
            throw new Error("Error fetching rooms: " + error.message);
        }
    }
    async getRoomById(id) {
        try {
            return await this.repository.getRoomById(id);
        } catch (error) {
            throw new Error("Error fetching room: " + error.message);
        }
    }

    async createRoom(data) {
        try {
            return await this.repository.createRoom(data);
        } catch (error) {
            throw new Error("Error creating room: " + error.message);
        }
    }

    async editRoom(id, data) {
        try {
            return await this.repository.editRoom(id, data);
        } catch (error) {
            throw new Error("Error updating room: " + error.message);
        }
    }

    async deleteRoom(id) {
        try {
            return await this.repository.deleteRoom(id);
        } catch (error) {
            throw new Error("Error deleting room: " + error.message);
        }
    }
}

export default RoomService;
