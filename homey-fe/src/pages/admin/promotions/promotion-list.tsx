import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { resetStatus, getPromotionList } from "../../../redux/promotionSlice";
import "../../../styles/admin/table.css";

const PromotionList: React.FC = () => {
    const dispatch = useAppDispatch();
    const promotions = useAppSelector((state) => state.promotion.promotions);
    const pagination = useAppSelector((state) => state.promotion.pagination);

    const [page, setPage] = useState(1);
    const [pageSize] = useState(5); // số lượng mỗi trang

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getPromotionList({ page, pageSize }));
    }, [dispatch, page, pageSize]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
            setPage(newPage);
        }
    };

    return (
        <div className="data-container">
            <div className="data-header">
                <h2>Promotion List</h2>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search promotions..." />
                </div>
            </div>

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
                    {promotions.map((promo, index) => (
                        <tr key={promo.id}>
                            <td>{(page - 1) * pageSize + index + 1}</td> {/* STT liên tục */}
                            <td>{promo.code}</td>
                            <td>{promo.discount_type}</td>
                            <td>{promo.discount_value}</td>
                            <td>{promo.start_date}</td>
                            <td>{promo.end_date}</td>
                            <td>{promo.status}</td>
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
