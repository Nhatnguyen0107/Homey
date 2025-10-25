import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../services/axiosClient";
import {
    FaSwimmingPool, FaWifi, FaParking, FaConciergeBell, FaSmokingBan,
    FaUtensils, FaShuttleVan, FaWheelchair, FaUsers, FaTree,
    FaMapMarkerAlt, FaStar, FaRegClock, FaBed, FaCalendarAlt, FaUserFriends
} from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface RoomDetail {
    id: string;
    room_name: string;
    price: number;
    description: string;
    images: string[];
    rating: number;
}

const RoomDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [detail, setDetail] = useState<RoomDetail | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [location, setLocation] = useState("TP. Hồ Chí Minh");
    const [totalPrice, setTotalPrice] = useState(0);
    const bookingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchRoomDetail = async () => {
            try {
                const res = await axiosClient.get(`rooms/room-detail/${id}`);
                const data = res.data.data || res.data;
                data.images = Array.isArray(data.images)
                    ? data.images
                    : JSON.parse(data.images || "[]");
                setDetail(data);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết phòng:", error);
            }
        };
        fetchRoomDetail();
    }, [id]);

    useEffect(() => {
        if (startDate && endDate && detail) {
            const diffDays = Math.max(
                1,
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            setTotalPrice(diffDays * detail.price * quantity);
        }
    }, [startDate, endDate, quantity, detail]);

    const scrollToBookingForm = () => {
        bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleBooking = () => {
        scrollToBookingForm();
    };

    const handleConfirmBooking = async () => {
        console.log("👤 user hiện tại:", user);
        if (!user) {
            alert("⚠️ Bạn cần đăng nhập để đặt phòng!");
            navigate("/login");
            return;
        }

        if (!startDate || !endDate) {
            alert("Vui lòng chọn ngày nhận và trả phòng hợp lệ!");
            return;
        }

        try {
            const res = await axiosClient.post("/bookings", {
                room_id: detail?.id,
                start_date: startDate,
                end_date: endDate,
                quantity,
                location,
            });
            alert("✅ Đặt phòng thành công!");
            navigate(`/checkout/${res.data.id}`);
        } catch (err: any) {
            console.error("❌ Lỗi đặt phòng:", err);
            alert("❌ Đặt phòng thất bại, vui lòng thử lại!");
        }
    };


    if (!detail)
        return <p className="text-center py-10 text-gray-500">Đang tải chi tiết phòng...</p>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow container mx-auto px-6 py-10">
                {/* Quay lại */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
                >
                    <IoMdArrowBack className="mr-2" size={20} />
                    Quay lại danh mục
                </button>

                {/* Tiêu đề */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 flex items-center">
                            <FaBed className="text-blue-600 mr-3" /> {detail.room_name}
                        </h1>
                        <p className="text-gray-500 mt-1 flex items-center">
                            <FaMapMarkerAlt className="text-red-500 mr-2" /> Vị trí trung tâm, thuận tiện di chuyển
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-xl font-semibold text-blue-600 mb-2">
                            {Number(detail.price).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}{" "}
                            / đêm
                        </p>
                        <p className="text-yellow-500 flex justify-end items-center mt-1">
                            <FaStar className="mr-1" /> {detail.rating} / 10
                        </p>
                    </div>
                </div>

                {/* Ảnh + mô tả */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="grid grid-cols-2 gap-3">
                        {detail.images.length > 0 ? (
                            detail.images.map((img, i) => (
                                <img key={i} src={img} alt={`Ảnh ${i + 1}`}
                                    className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300 object-cover h-48 w-full" />
                            ))
                        ) : (
                            <img src="/default-room.jpg" alt="Không có ảnh"
                                className="rounded-xl shadow-md object-cover h-48 w-full" />
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <p className="text-gray-700 leading-relaxed mb-4">{detail.description}</p>
                        <button
                            onClick={handleBooking}
                            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center"
                        >
                            <FaRegClock className="mr-2" /> Đặt ngay
                        </button>
                    </div>
                </div>

                {/* Form đặt phòng */}
                <div ref={bookingRef} className="bg-white rounded-2xl shadow-md p-6 mb-10">
                    <h3 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center">
                        <FaCalendarAlt className="text-blue-500 mr-3" /> Đặt phòng của bạn
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-600 mb-1">Ngày nhận phòng</label>
                            <DatePicker
                                selected={startDate}
                                onChange={setStartDate}
                                dateFormat="dd/MM/yyyy"
                                className="border rounded-md p-2 w-full"
                                placeholderText="Chọn ngày đến"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Ngày trả phòng</label>
                            <DatePicker
                                selected={endDate}
                                onChange={setEndDate}
                                minDate={startDate}
                                dateFormat="dd/MM/yyyy"
                                className="border rounded-md p-2 w-full"
                                placeholderText="Chọn ngày đi"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Số lượng phòng</label>
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="border rounded-md p-2 w-full"
                            />
                        </div>
                    </div>

                    {/* Thêm địa điểm */}
                    <div className="mb-6">
                        <label className="block text-gray-600 mb-1">Địa điểm</label>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border rounded-md p-2 w-full"
                        >
                            <option>TP. Hồ Chí Minh</option>
                            <option>Hà Nội</option>
                            <option>Đà Nẵng</option>
                            <option>Vũng Tàu</option>
                            <option>Đà Lạt</option>
                        </select>
                    </div>

                    <div className="text-gray-700 mb-4 flex items-center">
                        <FaUserFriends className="mr-2 text-blue-500" />
                        Phù hợp cho 2 người lớn và 1 trẻ em
                    </div>

                    <p className="text-gray-700 mb-3">
                        <strong>Giá mỗi đêm:</strong> {detail.price.toLocaleString("vi-VN")} VND<br />
                        <strong>Tổng tiền:</strong> {totalPrice.toLocaleString("vi-VN")} VND
                    </p>

                    <button
                        onClick={handleConfirmBooking}
                        className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    >
                        Tôi sẽ đặt
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RoomDetailPage;
