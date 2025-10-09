import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const RoomDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Dữ liệu cứng demo
    const room = {
        id,
        name: "Phòng Deluxe Sang Trọng",
        location: "Quận 1, TP. Hồ Chí Minh",
        description:
            "Phòng Deluxe rộng rãi, nội thất hiện đại, ban công view thành phố, có minibar và bồn tắm lớn.",
        price: 1900000,
        images: [
            "https://picsum.photos/seed/room1/600/400",
            "https://picsum.photos/seed/room2/600/400",
            "https://picsum.photos/seed/room3/600/400",
        ],
        amenities: ["WiFi miễn phí", "Điều hòa", "TV màn hình phẳng", "Bồn tắm"],
    };

    const handleBooking = () => {
        if (!user) {
            alert("⚠️ Bạn cần đăng nhập để đặt phòng!");
            navigate("/login");
            return;
        }

        navigate(`/booking/${room.id}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-4">{room.name}</h2>
                <p className="text-gray-500 mb-2">{room.location}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="grid grid-cols-2 gap-2">
                        {room.images.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Ảnh ${idx}`}
                                className="rounded-lg shadow"
                            />
                        ))}
                    </div>

                    <div>
                        <p className="text-lg mb-4">{room.description}</p>
                        <p className="text-xl font-semibold text-blue-600 mb-4">
                            {room.price.toLocaleString()} VND/đêm
                        </p>

                        <h4 className="font-bold mb-2">Tiện nghi:</h4>
                        <ul className="list-disc list-inside text-gray-700 mb-6">
                            {room.amenities.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>

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
