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
  const [search, setSearch] = useState(""); // từ khóa tìm kiếm

  // Load danh sách khi page thay đổi hoặc lần đầu
  useEffect(() => {
    dispatch(resetStatus());
    dispatch(getCategoryList({ page, pageSize, search }));
  }, [dispatch, page, pageSize]);

  // Tìm kiếm với debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1); // reset về trang 1 khi search
      dispatch(getCategoryList({ page: 1, pageSize, search }));
    }, 500);

    return () => clearTimeout(timer);
  }, [search, dispatch, pageSize]);

  const addCategory = () => {
    navigate("/admin/category-form");
  };

  const editCategory = (id?: string) => {
    if (id) navigate(`/admin/category-form/${id}`);
  };

  const deleteCate = (id?: string) => {
    if (id) {
      dispatch(
        deleteCategory({
          id,
          cb: () => {
            dispatch(getCategoryList({ page, pageSize, search })); // gọi lại danh sách sau khi xóa
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
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
              <td>{(page - 1) * pageSize + index + 1}</td>
              <td>
                {cate.image_url?.length ? (
                  <img
                    src={
                      cate.image_url[0].startsWith("http")
                        ? cate.image_url[0]
                        : `http://localhost:3000${cate.image_url[0]}`
                    }
                    alt={cate.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td>{cate.name}</td>
              <td>
                <button
                  className="btn-action edit"
                  type="button"
                  onClick={() => editCategory(cate.id)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="btn-action delete"
                  type="button"
                  onClick={() => deleteCate(cate.id)}
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No categories found
              </td>
            </tr>
          )}
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
