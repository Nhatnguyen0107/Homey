import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

    const handleBooking = () => {
        navigate("/payment", {
            state: {
                room_id: room.id,
                start_date: startDate,
                end_date: endDate,
                quantity,
                total_price: totalPrice,
            },
        });

    };

    if (!room) {
        return <div className="text-center mt-20 text-gray-600">Không tìm thấy thông tin phòng để đặt.</div>;
    }

    return (
        <>
            <div className="max-w-5xl mx-auto p-6 mt-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Xác nhận đặt phòng</h1>

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

                <div className="bg-gray-50 p-5 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                        {room.room_name || room.name}
                    </h2>
                    <p className="text-gray-600">{room.description}</p>

                    <div className="mt-4 space-y-1">
                        <p className="text-blue-600 font-semibold">
                            Giá: {Number(room.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })} / đêm
                        </p>
                        <p>Ngày nhận phòng: <b>{new Date(startDate).toLocaleDateString("vi-VN")}</b></p>
                        <p>Ngày trả phòng: <b>{new Date(endDate).toLocaleDateString("vi-VN")}</b></p>
                        <p>Số lượng phòng: <b>{quantity}</b></p>
                        <p className="text-lg font-semibold text-green-600">
                            Tổng tiền: {Number(totalPrice).toLocaleString("vi-VN")} VND
                        </p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition">
                        ← Quay lại
                    </button>
                    <button
                        onClick={handleBooking}
                        className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Tiếp tục thanh toán
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default BookingDetailPage;
