import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Offers from "../../components/Offers";
import Destinations from "../../components/Destinations";
import AccommodationType from "../../components/AccommodationType";

interface Room {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate(); // khởi tạo điều hướng

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Lỗi load rooms:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search */}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Tìm chỗ nghỉ tiếp theo</h2>
        <p className="text-gray-600 mb-6">
          Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
        </p>
        <SearchBar />
      </div>

      {/* Offers */}
      <div className="container mx-auto p-6">
        <Offers />
      </div>

      {/* Destinations */}
      <div className="container mx-auto p-6">
        <Destinations />
      </div>

      {/* Accommodation Types */}
      <div className="container mx-auto p-6">
        <AccommodationType />
      </div>

      {/* Rooms */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Danh sách phòng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => navigate(`/room/${room.id}`)}
              className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:3000${room.image_url}`}
                alt={room.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{room.name}</h3>
                <p className="text-gray-600">{room.description}</p>
                <p className="text-blue-600 font-semibold mt-2">
                  {room.price.toLocaleString()} VND/đêm
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center p-4 mt-10">
        © 2025 Booking
      </footer>
    </div>
  );
};

export default Home;
