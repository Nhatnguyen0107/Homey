import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, /*useState*/ } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { resetStatus, getUserList, deleteUser } from "../../../redux/userSlice";
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

  function addUser() {
    navigate("/admin/user-form");
  }

  const editUser = (id?: string) => {
    if (id) {
      navigate(`/admin/user-form/${id}`);
    }
  };

  // delete users
  const deleteUsers = (id?: string) => {
    if (id) {
      dispatch(
        deleteUser({
          id,
          // cb: () => {
          //   dispatch(getCategoryList({}));
          // },
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
            <th>Role</th>
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
              <td>{user.roleName || "—"}</td> {/* ✅ Hiển thị role */}
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
        <button className="page-btn active">1</button>
      </div>
    </div>
  );
};

export default UserList;
