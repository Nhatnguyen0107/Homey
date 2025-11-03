import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { resetStatus, getPromotionList, deletePromotion } from "../../../redux/promotionSlice";
import "../../../styles/admin/table.css";
import { useNavigate } from "react-router-dom";

const PromotionList: React.FC = () => {
    const dispatch = useAppDispatch();
    const promotions = useAppSelector((state) => state.promotion.promotions);
    const pagination = useAppSelector((state) => state.promotion.pagination);
    const loading = useAppSelector((state) => state.promotion.loading);
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [search, setSearch] = useState("");

    // Load danh sách khi page thay đổi hoặc lần đầu
    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getPromotionList({ page, pageSize, search }));
    }, [dispatch, page, pageSize]);

    // Tìm kiếm với debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1); // reset về trang 1 khi search
            dispatch(getPromotionList({ page: 1, pageSize, search }));
        }, 500);

        return () => clearTimeout(timer);
    }, [search, dispatch, pageSize]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
            setPage(newPage);
        }
    };

    const addPromotion = () => navigate("/admin/promotion-form");

    const editPromotion = (id?: string) => {
        if (id) navigate(`/admin/promotion-form/${id}`);
    };

    const deletePromotionItem = (id?: string) => {
        if (id && window.confirm("Bạn có chắc muốn xóa promotion này?")) {
            dispatch(deletePromotion({ id }));
        }
    };
    return (
        <div className="data-container">
            <div className="data-header">
                <div>
                    <h2>Promotion List</h2>
                    <button className="btn-add" onClick={addPromotion}>
                        <FaPlus /> Add Promotion
                    </button>
                </div>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search promotions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loading && <p>Loading...</p>}

            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Discount type</th>
                        <th>Discount value</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.length === 0 && !loading ? (
                        <tr>
                            <td colSpan={8} style={{ textAlign: "center" }}>
                                {search ? `No promotions found for "${search}".` : "No promotions found."}
                            </td>
                        </tr>
                    ) : (
                        promotions.map((promo, index) => (
                            <tr key={promo.id}>
                                <td>{(page - 1) * pageSize + index + 1}</td>
                                <td>
                                    <span className="code-badge">{promo.code}</span>
                                </td>
                                <td>
                                    <span className={`type-badge ${promo.discount_type}`}>
                                        {promo.discount_type}
                                    </span>
                                </td>
                                <td>
                                    {promo.discount_type === "percent"
                                        ? `${promo.discount_value}%`
                                        : `$${promo.discount_value}`
                                    }
                                </td>
                                <td>{new Date(promo.start_date || "").toLocaleDateString()}</td>
                                <td>{new Date(promo.end_date || "").toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-badge ${promo.status}`}>
                                        {promo.status}
                                    </span>
                                </td>
                                <td className="action-cell">
                                    <button
                                        className="btn-action edit"
                                        onClick={() => editPromotion(promo.id)}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className="btn-action delete"
                                        onClick={() => deletePromotionItem(promo.id)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
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

export default PromotionList;
