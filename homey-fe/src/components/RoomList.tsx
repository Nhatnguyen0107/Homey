import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../services/axiosClient";


interface Category {
    id: string;
    name: string;
}

interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string[]; // Mảng ảnh JSON
    category?: Category;
}

const RoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await axiosClient.get("rooms");
                const data = Array.isArray(res.data) ? res.data : res.data.data;

                const parsed = data.map((room: any) => ({
                    ...room,
                    image_url: Array.isArray(room.image_url)
                        ? room.image_url
                        : JSON.parse(room.image_url || "[]"),
                }));

                setRooms(parsed);
            } catch (err) {
                console.error("Lỗi tải rooms:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) return <p className="text-center py-10">Đang tải danh sách phòng...</p>;

    return (
        <section className="py-10 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Danh sách phòng</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            onClick={() => navigate(`/rooms/${room.id}`)}
                            className="cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-lg transition-transform duration-200 hover:scale-105 bg-white border border-gray-200"
                        >
                            <img
                                src={
                                    room.image_url && room.image_url.length > 0
                                        ? `${room.image_url[0]}`
                                        : "/default-room.jpg"
                                }
                                alt={room.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2">{room.description}</p>
                                <p className="mt-2 text-blue-600 font-semibold">
                                    {room.price.toLocaleString("vi-VN")} VND / đêm
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoomList;
