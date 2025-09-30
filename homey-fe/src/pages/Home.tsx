import React from "react";
import SearchBar from "../components/SearchBar";
import Offers from "../components/Offers";
import Destinations from "../components/Destinations";
import AccommodationType from "../components/AccommodationType";
import { useNavigate } from "react-router-dom";
import Logo from '../../public/img/logo.png';

const Home: React.FC = () => {
    const navigate = useNavigate(); // ✅ hook để điều hướng
    return (
        <div className="min-h-screen bg-gray-50" >
            {/* Header */}
            <header className="bg-blue-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <img src={Logo} alt="" className="h-20 w-50 object-contain" />
                    <div className="space-x-4">
                        <button className="hover:underline" onClick={() => navigate('/register')}>Đăng ký</button>
                        <button className="hover:underline" onClick={() => navigate('/login')}>Đăng nhập</button>
                    </div>
                </div>
            </header>

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

            {/* Footer */}
            <footer className="bg-blue-900 text-white text-center p-4 mt-10">
                © 2025 Booking Clone. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
