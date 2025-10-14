import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { resetStatus, getUserList } from "../../../redux/userSlice";
import "../../../styles/admin/table.css";


const UserList: React.FC = () => {
  // const [search, setSearch] = useState("");
  // const [sortAsc, setSortAsc] = useState(true);
  const users = useAppSelector((state) => state.user.users);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(getUserList({}));
  }, []);



  return (
    <div className="data-container">
      <div className="data-header">
        <h2>User List</h2>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search categories..." />
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="action-cell">
                <button className="btn-action edit">
                  <FaEdit /> Edit
                </button>
                <button className="btn-action delete">
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      <div className="pagination">
        <button className="page-btn active">1</button>
      </div>
    </div>
  );
};

export default UserList;
