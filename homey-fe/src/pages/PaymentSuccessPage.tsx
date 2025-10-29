import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccessPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking, payment } = location.state || {};

    if (!booking || !payment) {
        return <p className="text-center text-red-500 mt-10">Không có dữ liệu thanh toán!</p>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Thanh toán thành công 🎉</h1>

            <p><strong>Mã đặt phòng:</strong> {booking.id}</p>
            <p><strong>Phòng:</strong> {booking.room?.name || booking.room_id}</p>
            <p><strong>Tổng tiền:</strong> {Number(payment.amount).toLocaleString("vi-VN")} VND</p>
            <p><strong>Phương thức:</strong> {payment.method}</p>
            <p><strong>Trạng thái:</strong> {payment.status}</p>

            <button
                onClick={() => navigate("/my-bookings")}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
                Xem danh sách đặt phòng
            </button>
        </div>
    );
};

export default PaymentSuccessPage;
