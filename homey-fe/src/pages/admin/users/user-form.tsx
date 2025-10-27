import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Role {
    id: string;
    name: string;
}

interface User {
    userName: string;
    email: string;
    phone: string;
    password?: string;
    role_id: string;
}

const AdminUserForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy id nếu đang edit
    const [roles, setRoles] = useState<Role[]>([]);
    const [formData, setFormData] = useState<User | null>(null); // <-- null ban đầu
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // --- Lấy danh sách roles ---
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/roles");
                const rolesData: Role[] = res.data.data;
                setRoles(rolesData);

                if (!id && rolesData.length > 0) {
                    // Tạo mới: set role mặc định
                    setFormData({
                        userName: "",
                        email: "",
                        phone: "",
                        password: "",
                        role_id: rolesData[0].id,
                    });
                }
            } catch (err) {
                console.error("Lỗi lấy roles:", err);
            }
        };
        fetchRoles();
    }, [id]);

    // --- Fetch dữ liệu user cũ nếu edit ---
    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/users/${id}`);
                const user = res.data.data;
                setFormData({
                    userName: user.userName,
                    email: user.email,
                    phone: user.phone,
                    password: "", // để trống nếu không đổi
                    role_id: user.role_id,
                });
            } catch (err) {
                console.error("Lỗi lấy user:", err);
            }
        };
        fetchUser();
    }, [id]);

    // --- Chưa có formData thì không render form ---
    if (!formData) return <p>Loading...</p>;

    // --- handle change ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- validate ---
    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.userName) newErrors.userName = "Tên bắt buộc";
        if (!formData.email) newErrors.email = "Email bắt buộc";
        if (!formData.phone) newErrors.phone = "Số điện thoại bắt buộc";
        if (!id && !formData.password) newErrors.password = "Password bắt buộc";
        if (!formData.role_id) newErrors.role_id = "Chọn role";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- submit ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (id) {
                await axios.put(`http://localhost:3000/api/v1/users/${id}`, formData);
                alert("Cập nhật user thành công");
            } else {
                await axios.post("http://localhost:3000/api/v1/users", formData);
                alert("Thêm user thành công");
            }
            navigate("/admin/user-list");
        } catch (err: any) {
            console.error("Lỗi lưu user:", err.response?.data || err);
            alert("Lưu user thất bại: " + (err.response?.data?.message || ""));
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="user-form">
                <h2>{id ? "Edit User" : "Add User"}</h2>

                <div className="form-group">
                    <label>User Name</label>
                    <input name="userName" value={formData.userName} onChange={handleChange} />
                    {errors.userName && <p className="error-message">{errors.userName}</p>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        placeholder={id ? "Để trống nếu không đổi" : ""}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select name="role_id" value={formData.role_id} onChange={handleChange}>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {errors.role_id && <p className="error-message">{errors.role_id}</p>}
                </div>

                <button type="submit" className="btn-submit">
                    {id ? "Update" : "Create"}
                </button>
            </form>
        </div>
    );
};

export default AdminUserForm;
