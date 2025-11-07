import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const RoomTypeDetail: React.FC = () => {
    const { id: _id } = useParams();

    const rooms = [
        { id: 1, name: "La Siesta Premium Saigon Central", location: "Quận 1", price: 3442500, rating: 9.4, image: "https://cf.bstatic.com/xdata/images/hotel/square600/229288103.webp?k=9984a86932390ff4d27fc298609dd38ae0f0136547283699cdb08a61b5a82cf7&o=" },
        { id: 2, name: "Fusion Original Saigon Centre", location: "Quận 1", price: 6014250, rating: 9.2, image: "https://cf.bstatic.com/xdata/images/hotel/square600/358169129.webp?k=c8877c10979325549322353e7efe05476ec90ae95ab42c838f94557eb2f3c129&o=" },
        { id: 3, name: "MEANDER Saigon", location: "Quận 1", price: 3240000, rating: 9.2, image: "https://cf.bstatic.com/xdata/images/hotel/square600/98900657.webp?k=dad4b7c28346206f484f5048105240181a36bb917aee8bc2c665c7d4143edf54&o=" },
        { id: 4, name: "Chez Mimosa Local", location: "Quận 1", price: 875000, rating: 9.0, image: "https://cf.bstatic.com/xdata/images/hotel/square600/604547590.webp?k=60c97364743a33d27b92ebc1ebd83b0e33c79fab1d8f1dcabbaa0dcca81f1ed5&o=" },
        { id: 5, name: "Mai House Saigon Hotel", location: "Quận 3", price: 775000, rating: 8.0, image: "https://cf.bstatic.com/xdata/images/hotel/square600/276002253.webp?k=53a33663af4a50ad8605292694ebd753d49803091408cc71bf6f59af1bcefc64&o=" },
        { id: 6, name: "Chez Mimosa Local", location: "Quận 7", price: 999000, rating: 9.5, image: "https://cf.bstatic.com/xdata/images/hotel/square600/293540955.webp?k=356b2bc3979cdfcecca1b40c467fb812372f6a923c65af420e43c1f0c38f3195&o=" },
    ];

    //  State lọc
    const [selectedDistrict, setSelectedDistrict] = useState<string>("Tất cả");
    const [selectedPrice, setSelectedPrice] = useState<string>("Tất cả");

    //  Danh sách quận có trong dữ liệu
    const districts = ["Tất cả", ...new Set(rooms.map((r) => r.location))];

    //  Bộ lọc
    const filteredRooms = rooms.filter((room) => {
        // Lọc quận
        const matchDistrict =
            selectedDistrict === "Tất cả" || room.location === selectedDistrict;

        // Lọc giá
        const matchPrice =
            selectedPrice === "Tất cả" ||
            (selectedPrice === "Dưới 1 triệu" && room.price < 1000000) ||
            (selectedPrice === "1 - 3 triệu" &&
                room.price >= 1000000 &&
                room.price <= 3000000) ||
            (selectedPrice === "Trên 3 triệu" && room.price > 3000000);

        return matchDistrict && matchPrice;
    });

    return (
        <div className="bg-[#0b0b0b] min-h-screen text-white flex flex-col">
            <div className="flex-1">
                {/* Thanh tìm kiếm */}
                <div className="bg-[#1c1c1c] p-6 border-b border-gray-700">
                    <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
                        <input
                            type="text"
                            placeholder="Bạn muốn đến đâu?"
                            className="flex-1 p-3 rounded-md bg-black text-white border border-yellow-500 placeholder-gray-400"
                        />
                        <input type="date" className="p-3 rounded-md bg-black text-white border border-yellow-500" />
                        <input type="date" className="p-3 rounded-md bg-black text-white border border-yellow-500" />
                        <select className="p-3 rounded-md bg-black text-white border border-yellow-500">
                            <option>2 người lớn · 0 trẻ em · 1 phòng</option>
                        </select>
                        <button className="bg-[#006ce4] hover:bg-blue-600 px-6 py-3 rounded-md font-semibold">
                            Tìm
                        </button>
                    </div>
                </div>

                {/* Breadcrumb */}
                <div className="max-w-6xl mx-auto py-4 text-sm text-gray-400">
                    <Link to="/" className="hover:underline text-blue-400">
                        Trang chủ
                    </Link>{" "}
                    ›{" "}
                    <span className="hover:underline cursor-pointer text-blue-400">
                        Khách sạn
                    </span>{" "}
                    › <span className="text-gray-300">Tất cả khách sạn</span>
                </div>

                {/* Bộ lọc */}
                <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center mb-6">
                    <div>
                        <label className="text-gray-300 mr-2">Lọc theo quận:</label>
                        <select
                            className="bg-[#1c1c1c] border border-gray-700 rounded-md px-4 py-2 text-white"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            {districts.map((district, i) => (
                                <option key={i} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-300 mr-2">Lọc theo giá:</label>
                        <select
                            className="bg-[#1c1c1c] border border-gray-700 rounded-md px-4 py-2 text-white"
                            value={selectedPrice}
                            onChange={(e) => setSelectedPrice(e.target.value)}
                        >
                            <option>Tất cả</option>
                            <option>Dưới 1 triệu</option>
                            <option>1 - 3 triệu</option>
                            <option>Trên 3 triệu</option>
                        </select>
                    </div>
                </div>

                {/* Danh sách phòng */}
                <div className="max-w-6xl mx-auto pb-10">
                    <h2 className="text-2xl font-bold mb-4">
                        Những khách sạn gần đây bạn có thể đặt phút chót
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Tìm ưu đãi khách sạn tuyệt vời cho đêm nay hoặc chuyến đi sắp tới
                    </p>

                    {/* Danh sách kết quả */}
                    {filteredRooms.length === 0 ? (
                        <p className="text-gray-400">Không có phòng phù hợp với bộ lọc.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            {filteredRooms.map((room) => (
                                <Link
                                    to={`/room/${room.id}`}
                                    key={room.id}
                                    className="flex bg-[#1c1c1c] rounded-lg overflow-hidden shadow hover:shadow-lg transition hover:scale-[1.01]"
                                >
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="w-40 h-40 object-cover"
                                    />
                                    <div className="p-4 flex-1">
                                        <h3 className="text-lg font-semibold">{room.name}</h3>
                                        <p className="text-sm text-gray-400 mb-2">
                                            {room.location}
                                        </p>
                                        <p className="text-blue-400 font-bold text-sm mb-1">
                                            VND {room.price.toLocaleString()}
                                        </p>
                                        <p className="text-gray-400 text-sm">Cho đêm nay</p>
                                    </div>
                                    <div className="p-4 flex items-start">
                                        <div className="bg-blue-600 px-2 py-1 rounded text-white font-bold">
                                            {room.rating}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RoomTypeDetail;
