import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";


const PaymentSuccessPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking, payment } = location.state || {};

    // 👇 Lấy kích thước màn hình để hiệu ứng confetti phủ toàn màn hình
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Nếu không có dữ liệu booking/payment
    if (!booking || !payment) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-green-50 to-white">
                <h1 className="text-4xl font-extrabold text-green-600 animate-bounce mb-4">
                    Cảm ơn bạn đã đặt phòng 🎉
                </h1>
                <p className="text-gray-600">Chúc bạn có một kỳ nghỉ thật tuyệt vời!</p>

            </div>
        );
    }

    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Hiệu ứng pháo hoa  */}
            <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={400} />

            {/* Nội dung chúc mừng */}
            <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl font-extrabold text-green-600 animate-bounce mb-4">
                    Thanh toán thành công 🎉
                </h1>

                <p className="text-gray-700 mb-2"><strong>Mã đặt phòng:</strong> {booking.id}</p>
                <p className="text-gray-700 mb-2"><strong>Phòng:</strong> {booking.room?.name || booking.room_id}</p>
                <p className="text-gray-700 mb-2"><strong>Tổng tiền:</strong> {Number(payment.amount).toLocaleString("vi-VN")} VND</p>
                <p className="text-gray-700 mb-2"><strong>Phương thức:</strong> {payment.method}</p>
                <p className="text-gray-700 mb-6"><strong>Trạng thái:</strong> {payment.status}</p>

                <button
                    onClick={() => navigate("/my-bookings")}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform hover:scale-105"
                >
                    Xem danh sách đặt phòng
                </button>
            </div>

            {/* Footer */}

        </div>
    );
};

export default PaymentSuccessPage;
