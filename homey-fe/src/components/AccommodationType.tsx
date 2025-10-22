// src/components/AccommodationType.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../services/axiosClient";
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
                    image_url: Array.isArray(item.image_url)
                        ? item.image_url
                        : JSON.parse(item.image_url || "[]"),
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
    );
};

export default AccommodationType;
