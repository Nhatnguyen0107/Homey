import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FormData {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: FileList;
}

interface City {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
}

const AddRoom = () => {
    const { register, handleSubmit, reset, watch } = useForm<FormData>();
    const navigate = useNavigate();

    const [cities, setCities] = useState<City[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    // 🏙️ Lấy danh sách city
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/cities");
                setCities(res.data?.data || res.data || []);
            } catch (err) {
                console.error("❌ Lỗi khi lấy danh sách city:", err);
                toast.error("Không thể tải danh sách thành phố!");
            }
        };
        fetchCities();
    }, []);

    // 📂 Lấy danh sách category
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/categories");
                setCategories(res.data?.data || res.data || []);
            } catch (err) {
                console.error("❌ Lỗi khi lấy danh sách category:", err);
                toast.error("Không thể tải danh sách danh mục!");
            }
        };
        fetchCategories();
    }, []);

    // 🖼️ Xem trước ảnh upload
    const watchImages = watch("images");
    useEffect(() => {
        if (watchImages && watchImages.length > 0) {
            const previews = Array.from(watchImages).map((file) =>
                URL.createObjectURL(file)
            );
            setPreviewImages(previews);
        } else {
            setPreviewImages([]);
        }

        return () => {
            previewImages.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [watchImages]);

    // 🧾 Xử lý submit form
    const onSubmit = async (data: FormData) => {
        if (!selectedCity || !selectedCategory) {
            toast.error("Vui lòng chọn Thành phố và Danh mục!");
            return;
        }

        try {
            // Upload ảnh trước
            const formData = new FormData();
            Array.from(data.images).forEach((file) => {
                formData.append("files", file);
            });

            const uploadRes = await axios.post(
                "http://localhost:3000/api/v1/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            const imageUrls = uploadRes.data.urls;

            // Gửi thông tin phòng
            const roomData = {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                city_id: selectedCity,
                category_id: selectedCategory,
                user_id: "31280b43-3ae9-467c-8d07-e12cd7f3a543", // 👈 thay bằng user id đăng nhập
                image_url: imageUrls, // backend của bạn nhận image_url[]
            };

            await axios.post("http://localhost:3000/api/v1/rooms", roomData);
            toast.success("Thêm phòng thành công!");
            reset();
            navigate("/admin/room-list");
        } catch (error: any) {
            console.error("❌ Lỗi khi thêm phòng:", error);
            toast.error(error.response?.data?.message || "Lỗi khi thêm phòng!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">🛏️ Thêm phòng mới</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
                encType="multipart/form-data"
            >
                <input
                    type="text"
                    placeholder="Tên phòng"
                    {...register("name", { required: true })}
                    className="border p-2 rounded"
                />

                <textarea
                    placeholder="Mô tả"
                    {...register("description", { required: true })}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Giá (VNĐ)"
                    {...register("price", { required: true })}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Số lượng phòng (stock)"
                    {...register("stock", { required: true })}
                    className="border p-2 rounded"
                />

                {/* Upload ảnh */}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("images", { required: true })}
                    className="border p-2 rounded"
                />

                {/* Preview ảnh */}
                {previewImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {previewImages.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt="preview"
                                className="w-24 h-24 object-cover rounded-md border"
                            />
                        ))}
                    </div>
                )}

                {/* City select */}
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Chọn thành phố</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>

                {/* Category select */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Chọn danh mục</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    ➕ Thêm phòng
                </button>
            </form>
        </div>
    );
};

export default AddRoom;
