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
    const [priceFilter, setPriceFilter] = useState<string>("all"); // 👈 bộ lọc giá

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                let endpoint = "/rooms";
                if (categoryId) endpoint = `/rooms/category/${categoryId}`;

                const res = await axiosClient.get(endpoint);
                console.log("📦 API rooms trả về:", res.data);

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

    //  Lọc danh sách phòng theo giá
    const filteredRooms = rooms.filter((room) => {
        if (priceFilter === "1-1.5") {
            return room.price >= 1000000 && room.price <= 1500000;
        }
        if (priceFilter === "1.5-2") {
            return room.price > 1500000 && room.price <= 2000000;
        }
        return true; // "all"
    });

    if (loading) return <p>Đang tải danh sách phòng...</p>;

    return (
        <section className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Danh sách phòng</h2>
                <Link to="/" className="text-blue-600 hover:underline">
                    ← Quay lại danh mục
                </Link>
            </div>

            {/* 🧭 Bộ lọc giá */}
            <div className="flex items-center gap-4 mb-6">
                <label className="font-medium">Lọc theo giá:</label>
                <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                >
                    <option value="all">Tất cả</option>
                    <option value="1-1.5">1.000.000 - 1.500.000 VND</option>
                    <option value="1.5-2">1.500.000 - 2.000.000 VND</option>
                </select>
            </div>

            {filteredRooms.length === 0 ? (
                <p>Không có phòng nào phù hợp với mức giá này.</p>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredRooms.map((room) => (
                        <Link
                            to={`/rooms/${room.id}`}
                            key={room.id}
                            className="border rounded-lg shadow hover:shadow-lg transition p-3 block"
                        >
                            <img
                                src={
                                    room.image_url && room.image_url.length > 0
                                        ? room.image_url[0].startsWith("http")
                                            ? room.image_url[0]
                                            : `http://localhost:3000${room.image_url[0]}`
                                        : "/default-room.jpg"
                                }
                                alt={room.name}
                                className="w-full h-48 object-cover"
                            />

                            <h4 className="text-lg font-semibold mt-2">{room.name}</h4>
                            <p className="text-gray-600 text-sm line-clamp-2">{room.description}</p>
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
