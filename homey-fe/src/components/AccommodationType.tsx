import React from "react";

import hotel from '../assets/img/hotel.jpg';
import apartment from '../assets/img/apartment.jpg';
import resort from '../assets/img/resort.webp';
import villa from '../assets/img/villa.jpg';

const accommodations = [
    { id: 1, name: "Khách sạn", image: hotel },
    { id: 2, name: "Căn hộ", image: apartment },
    { id: 3, name: "Resort", image: resort },
    { id: 4, name: "Biệt thự", image: villa },
];

const AccommodationTypes: React.FC = () => {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Tìm theo loại chỗ nghỉ</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {accommodations.map((a) => (
                    <div
                        key={a.id}
                        className="rounded-xl overflow-hidden shadow hover:scale-105 transition"
                    >
                        <img src={a.image} alt={a.name} className="w-full h-40 object-cover" />
                        <p className="text-center p-2 font-semibold">{a.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AccommodationTypes;
