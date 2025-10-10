import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { resetStatus, getPromotionList } from "../../../redux/promotionSlice";
import "../../../styles/admin/table.css";

const PromotionList: React.FC = () => {
    // const [search, setSearch] = useState("");
    // const [sortAsc, setSortAsc] = useState(true);

    const promotions = useAppSelector((state) => state.promotion.promotions);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getPromotionList({}));
    }, []);

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
                    {promotions.map((promo) => (
                        <tr key={promo.id}>
                            <td>{promo.id}</td>
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
                <button className="page-btn active">1</button>
            </div>
        </div>
    );
};

export default PromotionList;
