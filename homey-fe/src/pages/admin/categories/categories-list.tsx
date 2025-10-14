import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import {
  getCategoryList,
  resetStatus,
  deleteCategory,
} from "../../../redux/categorySlice";
import "../../../styles/admin/table.css";

const CategoryList: React.FC = () => {
  // const [search, setSearch] = useState("");
  // const [sortAsc, setSortAsc] = useState(true);
  const categories = useAppSelector((state) => state.category.categories);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(getCategoryList({}));
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
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cate) => (
            <tr key={cate.id}>
              <td>{cate.id}</td>
              <td>{cate.name}</td>
              <td>
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

export default CategoryList;
