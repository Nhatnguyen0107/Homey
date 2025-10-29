import React, { useState } from "react";
import axiosClient from "../services/axiosClient";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { room_id, total_price, start_date, end_date, quantity } = location.state || {};

    const [cardInfo, setCardInfo] = useState({ name: "", number: "", expiry: "", cvc: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!room_id) {
            toast.error("Không tìm thấy thông tin phòng!");
            return;
        }

        if (!cardInfo.name || !cardInfo.number || !cardInfo.expiry || !cardInfo.cvc) {
            toast.error("Vui lòng nhập đầy đủ thông tin thẻ!");
            return;
        }

        try {
            setLoading(true);

            // B1. Tạo booking trước
            const bookingRes = await axiosClient.post("/bookings", {
                room_id,
                start_date,
                end_date,
                quantity,
                total_price,
                status: "confirmed",
            });

            const bookingId = bookingRes.data?.data?.id;
            if (!bookingId) throw new Error("Không lấy được ID booking!");

            // B2. Tạo payment gắn booking_id
            await axiosClient.post("/payments", {
                booking_id: bookingId,
                method: "credit_card",
                amount: total_price,
                status: "paid",
            });

            Swal.fire({
                title: "🎉 Thanh toán thành công!",
                text: "Đặt phòng của bạn đã được xác nhận.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/payment-success");
            });
        } catch (error) {
            console.error("❌ Payment error:", error);
            toast.error("Có lỗi xảy ra khi thanh toán!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
            <h2 className="text-2xl font-semibold mb-6">Thanh toán bằng thẻ</h2>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg w-[420px]">
                <div className="mb-4">
                    <label className="block mb-1 text-sm">Tên chủ thẻ *</label>
                    <input
                        type="text"
                        name="name"
                        value={cardInfo.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:border-blue-500"
                        placeholder="Nguyễn Văn A"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm">Số thẻ *</label>
                    <input
                        type="text"
                        name="number"
                        value={cardInfo.number}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:border-blue-500"
                        placeholder="xxxx xxxx xxxx xxxx"
                    />
                </div>
                <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                        <label className="block mb-1 text-sm">Ngày hết hạn *</label>
                        <input
                            type="text"
                            name="expiry"
                            value={cardInfo.expiry}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:border-blue-500"
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm">CVC *</label>
                        <input
                            type="text"
                            name="cvc"
                            value={cardInfo.cvc}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:border-blue-500"
                            placeholder="***"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
                >
                    {loading ? "Đang xử lý..." : "Hoàn tất thanh toán"}
                </button>
            </form>
        </div>
    );
}
