// src/pages/CategoryRoomsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../services/axiosClient";

interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string[] | string;
    category_id: string;
}

const CategoryRoomsPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                let endpoint = "/rooms";
                if (categoryId) endpoint = `/rooms/category/${categoryId}`;

                const res = await axiosClient.get(endpoint);
                console.log("📦 API rooms trả về:", res.data);

                //  Backend trả về { success: true, data: [...] }
                const list = res.data?.data ?? [];

                if (!Array.isArray(list)) {
                    console.error("❌ Dữ liệu rooms không phải mảng:", list);
                    setRooms([]);
                    return;
                }

                setRooms(list);
            } catch (err) {
                console.error("❌ Lỗi khi tải danh sách phòng:", err);
                setRooms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [categoryId]);

    if (loading) return <p>Đang tải danh sách phòng...</p>;

    return (
        <section className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Danh sách phòng</h2>
                <Link to="/" className="text-blue-600 hover:underline">
                    ← Quay lại danh mục
                </Link>
            </div>

            {rooms.length === 0 ? (
                <p>Không có phòng nào để hiển thị.</p>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <Link
                            to={`/rooms/room-detail/${room.id}`}
                            key={room.id}
                            className="border rounded-lg shadow hover:shadow-lg transition p-3 block"
                        >
                            <img
                                src={Array.isArray(room.image_url) ? room.image_url[0] : room.image_url}
                                alt={room.name}
                                className="w-full h-48 object-cover rounded-md"
                            />

                            <h4 className="text-lg font-semibold mt-2">{room.name}</h4>
                            <p className="text-gray-600 text-sm line-clamp-2">
                                {room.description}
                            </p>
                            <p className="text-blue-500 font-medium mt-1">
                                {room.price.toLocaleString()} VND / đêm
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CategoryRoomsPage;
