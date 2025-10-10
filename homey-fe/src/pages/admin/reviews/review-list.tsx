import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import "../../../styles/admin/table.css";
import { resetStatus, getReviewList } from "../../../redux/reviewSlice";

const ReviewList: React.FC = () => {
    // const [search, setSearch] = useState("");
    // const [sortAsc, setSortAsc] = useState(true);

    const reviews = useAppSelector((state) => state.review.reviews);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getReviewList({}));
    }, []);

    return (
        <div className="data-container">
            <div className="data-header">
                <h2>Review List</h2>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search reviews..." />
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User_id</th>
                        <th>Room_id</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td>{review.id}</td>
                            <td>{review.user_id}</td>
                            <td>{review.room_id}</td>
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
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

export default ReviewList;
