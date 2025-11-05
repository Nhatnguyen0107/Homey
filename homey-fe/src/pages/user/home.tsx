import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Offers from "../../components/Offers";
import Destinations from "../../components/Destinations";
import AccommodationType from "../../components/AccommodationType";
import RoomList from "../../components/RoomList";
import axiosClient from "../../services/axiosClient";
import BannerSlider from "../../components/BannerSlider";
import Services from "../../components/Services";
import Footer from "../../components/Footer";

interface Room {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

const Home: React.FC = () => {

  const [/*rooms*/, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosClient.get("/rooms");
        setRooms(res.data.data);
      } catch (err) {
        console.error("Lỗi load rooms:", err);
      }
    };
    fetchRooms();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 space-y-10">
        {/*  Banner slider */}
        <section className="mb-10">
          <BannerSlider />
        </section>
        {/* Search */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Tìm chỗ nghỉ tiếp theo</h2>
          <p className="text-gray-600 mb-6">
            Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
          </p>
          <SearchBar onSearch={setSearchTerm} />
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
        <div className="container mx-auto p-6 pb-0 px-6">
          <AccommodationType />
        </div>

        {/* Rooms (Danh sách phòng) */}
        <div className="container mx-auto pt-2 pb-6 px-6">
          <RoomList searchTerm={searchTerm} />
        </div>

        {/* dịch vụ */}
        <div className="container mx-auto px-6 mt-8">
          <Services />
        </div>
      </div>

      <div>
        <Footer />
      </div>

    </div>
  );
};

export default Home;
