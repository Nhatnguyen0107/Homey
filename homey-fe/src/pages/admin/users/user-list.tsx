import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { resetStatus, getUserList, deleteUser } from "../../../redux/userSlice";
import "../../../styles/admin/table.css";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const pagination = useAppSelector((state) => state.user.pagination);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // số lượng mỗi trang

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(getUserList({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  const addUser = () => navigate("/admin/user-form");

  const editUser = (id?: string) => {
    if (id) navigate(`/admin/user-form/${id}`);
  };

  const deleteUsers = (id?: string) => {
    if (id) {
      dispatch(
        deleteUser({
          id,
          cb: () => {
            dispatch(getUserList({ page, pageSize })); // gọi lại danh sách sau khi xóa
          },
        })
      );
    }
  };

  return (
    <div className="data-container">
      <div className="data-header">
        <div>
          <div className="title-name">
            <h2>User List</h2>
          </div>
          <div>
            <button className="btn-add" onClick={addUser}>
              <FaPlus /> Add User
            </button>
          </div>
        </div>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search users..." />
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Password</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{(page - 1) * pageSize + index + 1}</td> {/* STT liên tục */}
              <td>{user.userName}</td>
              <td>********</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.roleName || "—"}</td>
              <td>
                <button className="btn-action edit" type="button" onClick={() => editUser(user.id)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn-action delete" type="button" onClick={() => deleteUsers(user.id)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="page-btn" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
          Prev
        </button>

        {Array.from({ length: pagination?.totalPages || 1 }, (_, i) => (
          <button
            key={`page-${i + 1}`}
            className={`page-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button className="page-btn" disabled={page === pagination?.totalPages} onClick={() => handlePageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
