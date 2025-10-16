import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
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

  function addCategory() {
    navigate("/admin/category-form");
  }

  const editCategory = (id?: string) => {
    if (id) {
      navigate(`/admin/category-form/${id}`);
    }
  };

  const deleteCate = (id?: string) => {
    if (id) {
      dispatch(
        deleteCategory({
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
            <h2>Categories List</h2>
          </div>
          <div>
            <button className="btn-add" onClick={addCategory}>
              <FaPlus /> Add Category
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
                <button className="btn-action edit" type="button" onClick={() => editCategory(cate.id)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn-action delete" type="button" onClick={() => deleteCate(cate.id)}>
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
