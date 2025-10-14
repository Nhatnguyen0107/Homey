import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

const RoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/rooms");
                const data = Array.isArray(res.data) ? res.data : res.data.data;
                setRooms(data);
            } catch (err) {
                console.error("Lỗi tải rooms:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) return <p>Đang tải danh sách phòng...</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {rooms.map((room) => (
                <div
                    key={room.id}
                    className="cursor-pointer rounded-xl overflow-hidden shadow hover:scale-105 transition border border-gray-200"
                    onClick={() => navigate(`/rooms/${room.id}`)}
                >
                    <img
                        src={`http://localhost:3000${room.image_url}`}
                        alt={room.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-bold mb-2">{room.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{room.description}</p>
                        <p className="mt-2 text-blue-600 font-semibold">
                            {room.price.toLocaleString("vi-VN")} VND / đêm
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoomList;
