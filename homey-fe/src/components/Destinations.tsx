import React from "react";

import hochiminh from "../assets/img/hochiminh.jpg";
import danang from "../assets/img/danang.jpg";
import vungtau from "../assets/img/vungtau.jpg";
import hanoi from "../assets/img/hanoi.jpg";
import dalat from "../assets/img/dalat.jpg";
import vn from "../assets/img/Vn.png";

const destinations = [
    { id: 1, name: "TP. Hồ Chí Minh", image: hochiminh },
    { id: 2, name: "Vũng Tàu", image: vungtau },
    { id: 3, name: "Hà Nội", image: hanoi },
    { id: 4, name: "Đà Nẵng", image: danang },
    { id: 5, name: "Đà Lạt", image: dalat },
];

const Destinations: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto mt-10 px-4">
            {/* Tiêu đề */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-black">Điểm đến đang thịnh hành</h1>
                <p className="text-gray-400 text-sm">
                    Du khách tìm kiếm về Việt Nam cũng đặt chỗ ở những nơi này
                </p>
            </div>

            {/* Grid bố cục 3 trên, 2 dưới */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Hàng đầu 3 ảnh */}
                {destinations.slice(0, 3).map((d) => (
                    <div
                        key={d.id}
                        className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                    >
                        <img
                            src={d.image}
                            alt={d.name}
                            className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-3 left-4 flex items-center gap-2">
                            <h3 className="text-white text-lg font-bold">{d.name}</h3>
                            <img src={vn} alt="VN" className="w-5 h-4 rounded-sm" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Hàng dưới 2 ảnh */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {destinations.slice(3, 5).map((d) => (
                    <div
                        key={d.id}
                        className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                    >
                        <img
                            src={d.image}
                            alt={d.name}
                            className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-3 left-4 flex items-center gap-2">
                            <h3 className="text-white text-lg font-bold">{d.name}</h3>
                            <img src={vn} alt="VN" className="w-5 h-4 rounded-sm" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Destinations;
