import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import {
  getCategoryList,
  resetStatus,
  deleteCategory,
} from "../../../redux/categorySlice";
import "../../../styles/admin/table.css";

const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useAppSelector((state) => state.category.categories);
  const pagination = useAppSelector((state) => state.category.pagination);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // số lượng mỗi trang

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(getCategoryList({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  function addCategory() {
    navigate("/admin/category-form");
  }

  const editCategory = (id?: string) => {
    if (id) navigate(`/admin/category-form/${id}`);
  };

  const deleteCate = (id?: string) => {
    if (id) {
      dispatch(
        deleteCategory({
          id,
          cb: () => {
            dispatch(getCategoryList({ page, pageSize })); // gọi lại danh sách sau khi xóa
          },
        })
      );
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  return (
    <div className="data-container">
      <div className="data-header">
        <div className="title-name">
          <h2>Categories List</h2>
          <button className="btn-add" onClick={addCategory}>
            <FaPlus /> Add Category
          </button>
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
            <th>Image</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cate, index) => (
            <tr key={cate.id}>
              <td>{(page - 1) * pageSize + index + 1}</td> {/* số thứ tự theo trang */}
              <td>
                {cate.image_url ? (
                  <img
                    src={cate.image_url}
                    alt={cate.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
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
        <button
          className="page-btn"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
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

        <button
          className="page-btn"
          disabled={page === pagination?.totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
