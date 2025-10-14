// src/components/AccommodationType.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Link } from "react-router-dom"; // ✅ thêm dòng này
import type { TAny } from "../types/common";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> nguyenthien

interface Category {
    id: string;
    name: string;
    image_url: string;
}

const AccommodationType: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
<<<<<<< HEAD

                const res = await axios.get("http://localhost:3000/api/v1/room-types");
=======
                const res = await axios.get("http://localhost:3000/api/v1/categories");
>>>>>>> nguyenthien
                const list = Array.isArray(res.data) ? res.data : res.data.data;
                const unique = list.filter(
                    (item: TAny, index: number, arr: TAny) => arr.findIndex((t: TAny) => t.id === item.id) === index
                );
                setCategories(unique);
            } catch (err) {
                console.error("Lỗi load categories:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <p>Đang tải danh mục...</p>;

    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold mb-4">Danh mục phòng</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((c) => (
                    <div
                        key={c.id}
                        onClick={() => navigate(`/categories/${c.id}`)}
                        className="cursor-pointer rounded-xl overflow-hidden shadow hover:scale-105 transition border border-gray-200"
                    >
                        <img
                            src={`http://localhost:3000${c.image_url}`}
                            alt={c.name}
                            className="w-full h-40 object-cover"
                        />
                        <p className="text-center p-2 font-semibold">{c.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AccommodationType;
