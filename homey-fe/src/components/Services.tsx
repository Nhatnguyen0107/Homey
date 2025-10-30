import React from "react";
import { FaHandshake, FaGlobeAsia, FaComments, FaStar } from "react-icons/fa";

import dichvu1 from "../assets/img/dichvu1.png";
import dichvu2 from "../assets/img/dichvu2.png";
import dichvu3 from "../assets/img/dichvu3.png";
import dichvu4 from "../assets/img/dichvu4.png";
import dichvu5 from "../assets/img/dichvu5.png";

const services = [
    {
        id: 1,
        title: "Book now, pay later",
        desc: "Free cancellation for most rooms.",
        icon: <FaHandshake className="text-blue-600 text-3xl" />,
        img: dichvu1,
    },
    {
        id: 2,
        title: "Over 300 million verified reviews",
        desc: "Trusted opinions from travelers worldwide.",
        icon: <FaStar className="text-yellow-500 text-3xl" />,
        img: dichvu2,
    },
    {
        id: 3,
        title: "More than 2 million stays globally",
        desc: "Hotels, guesthouses, apartments, and more.",
        icon: <FaGlobeAsia className="text-green-600 text-3xl" />,
        img: dichvu3,
    },
    {
        id: 4,
        title: "24/7 reliable customer service",
        desc: "We’re always here to help you anytime.",
        icon: <FaComments className="text-purple-600 text-3xl" />,
        img: dichvu4,
    },
];

const Services: React.FC = () => {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-6">
                {/* Tiêu đề chính */}
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Why choose Booking.com?
                </h2>

                {/* 4 khối dịch vụ */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {services.map((s) => (
                        <div
                            key={s.id}
                            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-200 p-6 text-center"
                        >
                            <div className="flex justify-center mb-4">{s.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {s.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
                            <img
                                src={s.img}
                                alt={s.title}
                                className="mx-auto h-24 w-auto object-contain rounded-md"
                            />
                        </div>
                    ))}
                </div>

                {/* Khối nền xanh dưới cùng */}
                <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between bg-[#0058c9] text-white p-10 shadow-lg">
                    <div className="md:w-2/3">
                        <h3 className="text-2xl font-bold mb-4">
                            Want to feel comfortable like home on your next trip?
                        </h3>
                        <button className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 transition">
                            Explore stays
                        </button>
                    </div>
                    <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
                        <img
                            src={dichvu5}
                            alt="relax cat"
                            className="w-60 md:w-72 object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
