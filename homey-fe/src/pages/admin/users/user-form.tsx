import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FormData {
    userName: string;
    email: string;
    password: string;
    phone: string;
}

interface Role {
    id: string;
    name: string;
}

const AddUser = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const navigate = useNavigate();
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>("");

    // Lấy danh sách role từ API
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/roles");
                if (Array.isArray(res.data)) {
                    setRoles(res.data);
                } else if (Array.isArray(res.data.data)) {
                    // nếu API trả { data: [...] }
                    setRoles(res.data.data);
                } else {
                    setRoles([]);
                    console.warn("Roles API trả về không phải mảng:", res.data);
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách role:", err);
            }
        };

        fetchRoles();
    }, []);

    const onSubmit = async (data: FormData) => {
        if (!selectedRole) {
            toast.error("Vui lòng chọn role!");
            return;
        }
        try {
            await axios.post("http://localhost:3000/api/v1/users", {
                ...data,
                role_id: selectedRole, // gửi id của role
            });
            toast.success("Thêm user thành công!");
            reset();
            console.log("Đi tới trang user list...");
            navigate("/admin/user-list");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Lỗi khi thêm user!");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Thêm người dùng mới</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Họ tên"
                    {...register("userName")}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    {...register("password")}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    {...register("phone")}
                    className="border p-2 rounded"
                />

                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border p-2 rounded"
                    required
                >
                    <option value="">Chọn role</option>
                    {Array.isArray(roles) && roles.length > 0 ? (
                        roles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))
                    ) : (
                        <option value="">Không có role</option>
                    )}
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Thêm User
                </button>
            </form>
        </div>
    );
};

export default AddUser;
