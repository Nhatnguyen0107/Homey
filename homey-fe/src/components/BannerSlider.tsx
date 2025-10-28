import React, { useEffect, useState } from "react";
import banner3 from "../assets/img/banner3.png";
import banner4 from "../assets/img/banner4.png";
// import banner7 from "../assets/img/banner7.png";

const BannerSlider: React.FC = () => {
    const banners = [banner4, banner3];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 3000); // 5 giây đổi ảnh
        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="relative w-full h-[450px] overflow-hidden rounded-2xl shadow-lg">
            {banners.map((banner, index) => (
                <img
                    key={index}
                    src={banner}
                    alt={`banner-${index}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}

            {/* Overlay text giống Booking */}
            {/* <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start pl-10 text-white">
                <h2 className="text-4xl font-bold mb-2">Giảm đến 15% khi thuê xe</h2>
                <p className="text-lg mb-4">Đặt ngay để tận hưởng ưu đãi đặc biệt</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold">
                    Đặt ngay
                </button>
            </div> */}
        </div>
    );
};

export default BannerSlider;
