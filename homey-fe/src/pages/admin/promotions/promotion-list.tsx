import { FaSearch, FaEdit, FaTrash, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";
import "../../../styles/admin/table.css";

const PromotionList: React.FC = () => {
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);

    // mock data
    const mockUsers = [
    ];

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
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="action-cell">
                            <button className="btn-action edit">
                                <FaEdit /> Edit
                            </button>
                            <button className="btn-action delete">
                                <FaTrash /> Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="pagination">
                <button className="page-btn active">1</button>
            </div>
        </div>
    );
};

export default PromotionList;
