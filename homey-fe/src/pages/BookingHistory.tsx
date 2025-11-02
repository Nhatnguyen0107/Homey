import React, { useEffect, useState } from "react";
import axiosClient from "../services/axiosClient";

import Footer from "../components/Footer";

interface Booking {
    id: string;
    room_id: string;
    start_date: string;
    end_date: string;
    quantity: number;
    total_price: number;
    status: string;
    room?: {
        room_name: string;
        price: number;
        description: string;
    };
}

const BookingHistory: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axiosClient.get("/bookings/my-bookings");
                setBookings(res.data.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách booking:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleViewDetail = async (id: string) => {
        try {
            const res = await axiosClient.get(`/booking/${id}`);
            setSelectedBooking(res.data.data);
        } catch (error) {
            console.error("Lỗi khi xem chi tiết:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">


            <main className="flex-1 container mx-auto px-4 py-10">
                <h1 className="text-3xl font-semibold text-center mb-6 text-blue-800">
                    🧾 Lịch sử đặt phòng của bạn
                </h1>

                {loading ? (
                    <p className="text-center">Đang tải dữ liệu...</p>
                ) : bookings.length === 0 ? (
                    <p className="text-center text-gray-600">Bạn chưa có đơn đặt phòng nào.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((b) => (
                            <div
                                key={b.id}
                                className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition"
                            >
                                <h2 className="text-lg font-semibold text-blue-700 mb-2">
                                    {b.room?.room_name || "Thông tin phòng đã đặt"}
                                </h2>
                                <p><strong>Ngày bắt đầu:</strong> {b.start_date}</p>
                                <p><strong>Ngày kết thúc:</strong> {b.end_date}</p>
                                <p><strong>Số lượng:</strong> {b.quantity}</p>
                                <p><strong>Tổng tiền:</strong> {b.total_price.toLocaleString()}₫</p>
                                <p><strong>Trạng thái:</strong> {b.status}</p>

                                <button
                                    onClick={() => handleViewDetail(b.id)}
                                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {selectedBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Chi tiết đặt phòng</h2>
                            <p><strong>Tên phòng:</strong> {selectedBooking.room?.room_name}</p>
                            <p><strong>Mô tả:</strong> {selectedBooking.room?.description}</p>
                            <p><strong>Giá phòng:</strong> {selectedBooking.room?.price?.toLocaleString()}₫</p>
                            <p><strong>Ngày nhận:</strong> {selectedBooking.start_date}</p>
                            <p><strong>Ngày trả:</strong> {selectedBooking.end_date}</p>
                            <p><strong>Số lượng:</strong> {selectedBooking.quantity}</p>
                            <p><strong>Tổng tiền:</strong> {selectedBooking.total_price.toLocaleString()}₫</p>
                            <p><strong>Trạng thái:</strong> {selectedBooking.status}</p>

                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default BookingHistory;
