import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Offers from "../../components/Offers";
import Destinations from "../../components/Destinations";
import AccommodationType from "../../components/AccommodationType";
import RoomList from "../../components/RoomList";

interface Room {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

const Home: React.FC = () => {
  const [/*rooms*/, setRooms] = useState<Room[]>([]);
  // const navigate = useNavigate(); // khởi tạo điều hướng

  useEffect(() => {
    fetch("rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Lỗi load rooms:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 space-y-10">
        {/* Search */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Tìm chỗ nghỉ tiếp theo</h2>
          <p className="text-gray-600 mb-6">
            Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
          </p>
          <SearchBar />
        </section>

        {/* Offers */}
        <section>
          <Offers />
        </section>

        {/* Destinations */}
        <section>
          <Destinations />
        </section>

        {/* Accommodation Types (Danh mục phòng) */}
        <div className="container mx-auto p-6">
          <AccommodationType />
        </div>

        {/* Rooms (Danh sách phòng) */}
        <div className="container mx-auto p-6">
          <RoomList />
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
