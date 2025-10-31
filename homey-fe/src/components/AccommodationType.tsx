import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../services/axiosClient";
import { FaPercent, FaCar, FaBell } from "react-icons/fa";
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

    if (loading)
        return <p className="text-center py-10 text-lg">Đang tải danh mục...</p>;

    return (
        <>
            {/* --- PHẦN DANH MỤC PHÒNG --- */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">
                        Danh mục phòng
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {categories.map((c) => (
                            <div
                                key={c.id}
                                onClick={() => navigate(`/categories/${c.id}`)}
                                className="cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 bg-white border border-gray-200"
                            >
                                <img
                                    src={
                                        c.image_url && c.image_url.length > 0
                                            ? `${c.image_url[0]}`
                                            : "/default-room.jpg"
                                    }
                                    alt={c.name}
                                    className="w-full h-64 object-cover"
                                />
                                <p className="text-center py-4 text-lg font-semibold text-gray-800">
                                    {c.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PHẦN “ĐI NHIỀU HƠN, TRẢ ÍT HƠN” --- */}
            <section className="py-16 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Đi nhiều hơn, trả ít hơn
                        </h2>
                        <a
                            href="#"
                            className="text-blue-600 hover:underline text-base font-medium"
                        >
                            Tìm hiểu thêm về tặng thưởng
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Thẻ 1 */}
                        <div className="bg-blue-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-bold mb-3">Genius</h3>
                            <p className="text-base leading-relaxed">
                                Bạn ơi, bạn đang là{" "}
                                <span className="font-semibold">Genius Cấp 1</span> trong chương
                                trình khách hàng thân thiết của chúng tôi.
                            </p>
                        </div>

                        {/* Thẻ 2 */}
                        <div className="border border-blue-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition bg-white">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Giảm giá 10% cho chỗ nghỉ
                                </h3>
                                <FaPercent className="text-blue-500 text-2xl" />
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Tận hưởng giảm giá tại các chỗ nghỉ tham gia trên toàn cầu.
                            </p>
                        </div>

                        {/* Thẻ 3 */}
                        <div className="border border-blue-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition bg-white">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Giảm giá 10% cho xe thuê
                                </h3>
                                <FaCar className="text-blue-500 text-2xl" />
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Tiết kiệm khi thuê xe du lịch trên toàn thế giới.
                            </p>
                        </div>

                        {/* Thẻ 4 */}
                        <div className="border border-blue-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition bg-white cursor-pointer">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Thông báo giá vé máy bay
                                </h3>
                                <FaBell className="text-blue-500 text-2xl" />
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Theo dõi giá cho đường bay và ngày mong muốn trên ứng dụng.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AccommodationType;
