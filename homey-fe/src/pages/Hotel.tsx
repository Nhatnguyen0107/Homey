import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaClock } from "react-icons/fa";
import axiosClient from "../services/axiosClient";

import Footer from "../components/Footer";

interface Category {
    id: string;
    name: string;
}

interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string[];
    category?: Category;
    rating?: number;
    duration?: string;
}

const Hotel: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await axiosClient.get("/rooms");
                const data = res?.data?.data?.data || [];
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

    if (loading)
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-600 text-lg animate-pulse">Đang tải danh sách phòng...</p>
            </div>
        );

    return (
        <>


            <section className="bg-white py-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">
                        Danh sách khách sạn & phòng
                    </h2>

                    <div className="flex flex-col gap-6">
                        {rooms.map((room) => (
                            <div
                                key={room.id}
                                onClick={() => navigate(`/rooms/${room.id}`)}
                                className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                            >
                                {/* Hình ảnh phòng */}
                                <div className="sm:w-1/3 w-full">
                                    <img
                                        src={
                                            room.image_url && room.image_url.length > 0
                                                ? room.image_url[0]
                                                : "/default-room.jpg"
                                        }
                                        alt={room.name}
                                        className="w-full h-56 sm:h-full object-cover"
                                    />
                                </div>

                                {/* Thông tin phòng */}
                                <div className="flex flex-col justify-between p-5 sm:w-2/3">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                            {room.name}
                                        </h3>
                                        {room.category && (
                                            <p className="text-sm text-gray-500 mb-2">
                                                Hạng phòng: {room.category.name}
                                            </p>
                                        )}
                                        <p className="text-gray-700 text-sm line-clamp-3 mb-3">
                                            {room.description}
                                        </p>

                                        <div className="flex items-center text-yellow-500 text-sm mb-2">
                                            <FaStar className="mr-1" />
                                            <span>
                                                {room.rating ? room.rating.toFixed(1) : "4.7"} / 5.0
                                            </span>
                                            <span className="text-gray-500 ml-1">(Xuất sắc)</span>
                                        </div>

                                        <div className="flex items-center text-gray-600 text-sm">
                                            <FaClock className="mr-1" />
                                            <span>{room.duration || "Mở cửa hằng ngày"}</span>
                                        </div>
                                    </div>

                                    {/* Giá và nút xem chi tiết */}
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-lg font-semibold text-blue-700">
                                            {room.price.toLocaleString("vi-VN")} VND / đêm
                                        </p>
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/rooms/${room.id}`);
                                            }}
                                        >
                                            Xem chi tiết →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Hotel;
