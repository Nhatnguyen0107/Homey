import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/admin/table.css";

interface User {
  id: string;
  userName: string;
  email: string;
  phone: string;
  role_id: string;
  roleName: string;
  createdAt: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5; // mỗi trang 5 hàng
  const navigate = useNavigate();

  // Lấy danh sách users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users");
      setUsers(res.data);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = () => navigate("/admin/user-form");
  const editUser = (id?: string) => { if (id) navigate(`/admin/user-form/${id}`); };

  const deleteUser = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
      fetchUsers(); // refresh sau khi xóa
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  // 🔍 search Lọc theo tên/email
  const filteredUsers = users.filter(
    (u) =>
      u.userName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Phân trang
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const displayedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading) return <div className="text-center text-gray-500 mt-10">Đang tải dữ liệu...</div>;

  return (
    <div className="data-container">
      <div className="data-header">
        <div className="title-name">
          <h2>Users List</h2>
          <button className="btn-add" onClick={addUser}>
            <FaPlus /> Add User
          </button>
        </div>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.length > 0 ? (
            displayedUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.roleName}</td>
                <td>{new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
                <td>
                  <button
                    className="btn-action edit"
                    type="button"
                    onClick={() => editUser(user.id)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn-action delete"
                    type="button"
                    onClick={() => deleteUser(user.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <button className="page-btn" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={`page-${i + 1}`}
            className={`page-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button className="page-btn" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
