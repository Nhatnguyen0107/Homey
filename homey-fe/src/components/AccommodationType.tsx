// src/components/AccommodationType.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ thêm dòng này
import type { TAny } from "../types/common";

interface RoomType {
    id: number;
    name: string;
    image_url: string;
}

const AccommodationType: React.FC = () => {
    const [types, setTypes] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        const fetchRoomTypes = async () => {
            try {

                const res = await axios.get("http://localhost:3000/api/v1/room-types");
                const list = Array.isArray(res.data) ? res.data : res.data.data;
                const unique = list.filter(
                    (item: TAny, index: number, arr: TAny) => arr.findIndex((t: TAny) => t.id === item.id) === index
                );
                if (isMounted) {
                    setTypes(unique);
                }
            } catch (err) {
                console.error("Lỗi load loại phòng:", err);
                if (isMounted) setTypes([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchRoomTypes();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) return <p>Đang tải loại phòng...</p>;

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Loại phòng</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {types.map((t) => (
                    <Link
                        to={`/room-types/${t.id}`} // ✅ link sang trang chi tiết
                        key={t.id}
                        className="block rounded-xl overflow-hidden shadow hover:scale-105 transition"
                    >
                        <img
                            src={`http://localhost:3000${t.image_url}`}
                            alt={t.name}
                            className="w-full h-40 object-cover"
                        />
                        <p className="text-center p-2 font-semibold">{t.name}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default AccommodationType;
