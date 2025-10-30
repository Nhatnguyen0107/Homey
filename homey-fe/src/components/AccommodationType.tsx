// src/components/AccommodationType.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../services/axiosClient";
import { FaPercent, FaCar, FaBell } from "react-icons/fa"; // icon đẹp
import type { TAny } from "../types/common";

interface Category {
    id: string;
    name: string;
    image_url: string[];
}

const AccommodationType: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosClient.get("/categories");
                const list = Array.isArray(res.data) ? res.data : res.data.data;

                const parsedList = list.map((item: TAny) => ({
                    ...item,
                    image_url:
                        typeof item.image_url === "string"
                            ? [item.image_url]
                            : Array.isArray(item.image_url)
                                ? item.image_url
                                : [],
                }));

                setCategories(parsedList);
            } catch (err) {
                console.error("Lỗi load categories:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <p className="text-center py-10">Đang tải danh mục...</p>;

    return (
        <>
            {/* --- PHẦN DANH MỤC PHÒNG --- */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Danh mục phòng</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((c) => (
                            <div
                                key={c.id}
                                onClick={() => navigate(`/categories/${c.id}`)}
                                className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-200 hover:scale-105 bg-white border border-gray-200"
                            >
                                <img
                                    src={
                                        c.image_url && c.image_url.length > 0
                                            ? `${c.image_url[0]}`
                                            : "/default-room.jpg"
                                    }
                                    alt={c.name}
                                    className="w-full h-48 object-cover"
                                />
                                <p className="text-center py-3 font-semibold text-gray-800">{c.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PHẦN “ĐI NHIỀU HƠN, TRẢ ÍT HƠN” --- */}
            <section className="py-12 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Đi nhiều hơn, trả ít hơn</h2>
                        <a
                            href="#"
                            className="text-blue-600 hover:underline text-sm font-medium"
                        >
                            Tìm hiểu thêm về tặng thưởng
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Thẻ 1 */}
                        <div className="bg-blue-700 text-white rounded-xl p-5 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-bold mb-2">Genius</h3>
                            <p className="text-sm">
                                Bạn ơi, bạn đang là{" "}
                                <span className="font-semibold">Genius Cấp 1</span> trong chương
                                trình khách hàng thân thiết của chúng tôi
                            </p>
                        </div>

                        {/* Thẻ 2 */}
                        <div className="border border-blue-300 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-800">
                                    Giảm giá 10% cho chỗ nghỉ
                                </h3>
                                <FaPercent className="text-blue-500 text-lg" />
                            </div>
                            <p className="text-sm text-gray-600">
                                Tận hưởng giảm giá tại các chỗ nghỉ tham gia trên toàn cầu
                            </p>
                        </div>

                        {/* Thẻ 3 */}
                        <div className="border border-blue-300 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-800">
                                    Giảm giá 10% cho xe thuê
                                </h3>
                                <FaCar className="text-blue-500 text-lg" />
                            </div>
                            <p className="text-sm text-gray-600">
                                Tiết kiệm cho một số xe thuê
                            </p>
                        </div>

                        {/* Thẻ 4 */}
                        <div className="border border-blue-300 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-800">Thông báo giá vé máy bay</h3>
                                <FaBell className="text-blue-500 text-lg" />
                            </div>
                            <p className="text-sm text-gray-600">
                                Theo dõi giá cho đường bay và ngày mong muốn trên ứng dụng
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AccommodationType;
