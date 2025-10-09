import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

import { useAuth } from "../context/AuthContext";

const RoomDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // ✅ Dữ liệu mẫu (hiển thị tạm, sau này fetch API)
    const room = {
        id,
        name: "Fusion Original Saigon Centre",
        location: "65 Đường Lê Lợi, Takashimaya Saigon Centre, Quận 1, TP. Hồ Chí Minh",
        rating: 9.2,
        reviews: 2743,
        price: "6.014.250",
        description:
            "Nằm tại vị trí thuận tiện ở trung tâm TP. Hồ Chí Minh, Fusion Original Saigon Centre cung cấp Wi-Fi miễn phí ở toàn bộ khu vực và hồ bơi ngoài trời. Ngoài nhà hàng, khách sạn còn có quầy bar sang trọng, trung tâm thể dục hiện đại và khu vực nghỉ ngơi sang trọng.",
        images: [
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/358169129.jpg?k=c8877c10979325549322353e7efe05476ec90ae95ab42c838f94557eb2f3c129&o=",
            "https://cf.bstatic.com/xdata/images/hotel/max500/506468119.jpg?k=2a0b37970fd1044a21aab74117ad46cc70c69cddb6cc08d3309f8abba7a4254b&o=",
            "https://cf.bstatic.com/xdata/images/hotel/max500/359493269.jpg?k=5256fef1ec81be929643171e045d019431c3a3ff02b04b08ba7a446e932b13eb&o=",
            "https://cf.bstatic.com/xdata/images/hotel/max300/358169296.jpg?k=3aa167fb09327ef88d197aecb8bb361796bf9f88eb4112ccd57b2569adb1feb1&o=",
        ],
    };


    const handleBooking = () => {
        if (!user) {
            alert("⚠️ Vui lòng đăng nhập để tiếp tục đặt phòng!");
            navigate("/login");
            return;
        }
        navigate(`/booking/${id}`);
    };

    return (
        <div className="bg-[#0b0b0b] text-white min-h-screen flex flex-col">


            {/* ✅ Nội dung chính */}
            <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-400 mb-4">
                    <span className="text-blue-400 cursor-pointer hover:underline">
                        Việt Nam
                    </span>{" "}
                    ›{" "}
                    <span className="text-blue-400 cursor-pointer hover:underline">
                        TP. Hồ Chí Minh
                    </span>{" "}
                    ›{" "}
                    <span className="text-gray-300">{room.name}</span>
                </div>

                {/* Tiêu đề + rating */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-yellow-400">{room.name}</h1>
                        <p className="text-gray-400 mt-1">{room.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 px-3 py-1 rounded-md font-bold text-white">
                            {room.rating}
                        </div>
                        <p className="text-gray-400 text-sm">
                            {room.reviews.toLocaleString()} đánh giá
                        </p>
                    </div>
                </div>

                {/* Ảnh khách sạn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                    {room.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`room-${i}`}
                            className="w-full h-56 object-cover rounded-lg hover:opacity-90 transition"
                        />
                    ))}
                </div>

                {/* Mô tả */}
                <div className="mt-8 flex flex-col lg:flex-row gap-10">
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-3 text-yellow-400">
                            Tận hưởng dịch vụ đẳng cấp tại {room.name}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">{room.description}</p>

                        {/* Tiện nghi */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                                Tiện nghi nổi bật
                            </h3>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-300 text-sm">
                                <li>Hồ bơi ngoài trời</li>
                                <li>Trung tâm thể dục</li>
                                <li>Nhà hàng cao cấp</li>
                                <li>Quầy bar sang trọng</li>
                                <li>Bãi đỗ xe riêng</li>
                                <li>Wi-Fi miễn phí</li>
                            </ul>
                        </div>
                    </div>

                    {/* Thông tin giá và nút đặt */}
                    <div className="bg-[#1c1c1c] p-6 rounded-lg w-full lg:w-[350px] border border-gray-700 h-fit shadow-md">
                        <p className="text-gray-300 text-sm mb-1">Giá mỗi đêm từ</p>
                        <p className="text-3xl font-bold text-blue-400 mb-2">
                            VND {room.price}
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                            Đã bao gồm thuế và phí
                        </p>
                        <button
                            onClick={handleBooking}
                            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-md font-semibold text-lg transition"
                        >
                            Đặt ngay
                        </button>
                    </div>
                </div>
            </div>

            {/* ✅ Footer */}
            <Footer />
        </div>
    );
};

export default RoomDetailPage;
