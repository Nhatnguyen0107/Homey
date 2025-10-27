import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../services/axiosClient";
import Footer from "../components/Footer";

const BookingDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { room, startDate, endDate, quantity, totalPrice, location } = state || {};

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const raw = localStorage.getItem("me") || localStorage.getItem("user");
        if (raw) setUser(JSON.parse(raw));
    }, []);

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                userName: user.userName,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user]);

    if (!room) {
        return (
            <div className="text-center mt-20 text-gray-600">
                Không tìm thấy thông tin phòng để đặt.
            </div>
        );
    }

    const handleBooking = async () => {
        try {
            const payload = {
                user_id: user.id,
                room_id: room.id,
                start_date: startDate,
                end_date: endDate,
                quantity,
                total_price: totalPrice,
                location,
            };

            console.log("📦 Gửi payload đặt phòng:", payload);
            await axiosClient.post("/bookings", payload);

            alert("✅ Đặt phòng thành công!");
            navigate("/user/bookings");
        } catch (error: any) {
            console.error("❌ Lỗi đặt phòng:", error.response?.data || error.message);
            alert("❌ Lỗi khi đặt phòng!");
        }
    };

    return (
        <>
            <div className="max-w-5xl mx-auto p-6 mt-6 bg-white rounded-xl shadow-lg">
                {/* --- Tiêu đề --- */}
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                    Xác nhận đặt phòng
                </h1>

                {/* --- Hình ảnh phòng --- */}
                {room?.room_details && room.room_details.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {room.room_details.slice(0, 4).map((item: any, index: number) => (
                            <img
                                key={index}
                                src={item.image_url}
                                alt={`Ảnh phòng ${index + 1}`}
                                className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                            />
                        ))}
                    </div>
                )}


                {/* --- Thông tin phòng --- */}
                <div className="bg-gray-50 p-5 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                        {room.room_name || room.name}
                    </h2>
                    <p className="text-gray-600">{room.description}</p>

                    <div className="mt-4 space-y-1">
                        <p className="text-blue-600 font-semibold">
                            Giá: {Number(room.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })} / đêm

                        </p>
                        <p className="text-gray-700">
                            Ngày nhận phòng:{" "}
                            <b>{new Date(startDate).toLocaleDateString("vi-VN")}</b>
                        </p>
                        <p className="text-gray-700">
                            Ngày trả phòng:{" "}
                            <b>{new Date(endDate).toLocaleDateString("vi-VN")}</b>
                        </p>
                        <p className="text-gray-700">
                            Số lượng phòng: <b>{quantity}</b>
                        </p>
                        <p className="text-gray-800 text-lg font-semibold mt-2">
                            Tổng tiền:{" "}
                            <span className="text-green-600">
                                {totalPrice.toLocaleString("vi-VN")} VND
                            </span>
                        </p>
                    </div>
                </div>

                {/* --- Thông tin người đặt --- */}
                <div className="bg-gray-50 p-5 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                        Thông tin người đặt
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="border p-3 rounded-lg w-full"
                            value={formData.userName}
                            readOnly
                        />
                        <input
                            className="border p-3 rounded-lg w-full"
                            value={formData.email}
                            readOnly
                        />
                        <input
                            className="border p-3 rounded-lg w-full"
                            value={formData.phone}
                            readOnly
                        />
                    </div>

                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                            ← Quay lại
                        </button>
                        <button
                            onClick={handleBooking}
                            className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Xác nhận đặt phòng
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Footer --- */}
            <Footer />
        </>
    );
};

export default BookingDetailPage;
