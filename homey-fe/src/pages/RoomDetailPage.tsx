// src/pages/RoomDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

interface Room {
    id: string;
    name: string;
    image_url: string[];
    price: number;
}

interface RoomDetail {
    id: string;
    room_name: string;
    price: number;
    description: string;
    images: string[] | string;
    rating: number;
    room?: Room;
}

const RoomDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [detail, setDetail] = useState<RoomDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoomDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/rooms/room-detail/${id}`);
                const data = res.data.data || res.data;

                data.images = Array.isArray(data.images)
                    ? data.images
                    : JSON.parse(data.images || "[]");

                setDetail(data);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết phòng:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoomDetail();
    }, [id]);

    const handleBooking = () => {
        if (!user) {
            alert("⚠️ Bạn cần đăng nhập để đặt phòng!");
            navigate("/login");
            return;
        }
        navigate(`/booking/${detail?.room?.id}`);
    };

    if (loading) return <p className="text-center py-10">Đang tải chi tiết phòng...</p>;
    if (!detail) return <p className="text-center py-10">Không tìm thấy phòng.</p>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-grow container mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">{detail.room_name}</h2>
                <p className="text-gray-500 mb-4">
                    {detail.room?.name || "Tên phòng đang cập nhật"}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="grid grid-cols-2 gap-2">
                        {detail.images.length > 0 ? (
                            detail.images.map((img: string, index: number) => (
                                <img
                                    key={index}
                                    src={`http://localhost:3000${img}`}
                                    alt={`Ảnh ${index + 1}`}
                                    className="rounded-lg shadow h-48 w-full object-cover"
                                />
                            ))
                        ) : (
                            <img
                                src="/default-room.jpg"
                                alt="Không có ảnh"
                                className="rounded-lg shadow h-48 w-full object-cover"
                            />
                        )}
                    </div>

                    <div>
                        <p className="text-lg mb-4">{detail.description}</p>
                        <p className="text-xl font-semibold text-blue-600 mb-2">
                            {detail.price.toLocaleString()} VND / đêm
                        </p>
                        <p className="text-yellow-500 mb-4">⭐ {detail.rating}</p>

                        <button
                            onClick={handleBooking}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Đặt ngay
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RoomDetailPage;
