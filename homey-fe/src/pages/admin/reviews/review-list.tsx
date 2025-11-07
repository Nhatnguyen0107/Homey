import { FaSearch, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { resetStatus, getReviewList } from "../../../redux/reviewSlice";
import "../../../styles/admin/table.css";

const ReviewList: React.FC = () => {
    const dispatch = useAppDispatch();
    const reviews = useAppSelector((state) => state.review.reviews);
    const pagination = useAppSelector((state) => state.review.pagination);

    const [page, setPage] = useState(1);
    const [pageSize] = useState(5); // số lượng mỗi trang

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getReviewList({ page, pageSize }));
    }, [dispatch, page, pageSize]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
            setPage(newPage);
        }
    };

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
                        <th>User Name</th>
                        <th>Room Name</th>
                        <th>Rating</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={review.id}>
                            <td>{(page - 1) * pageSize + index + 1}</td> {/* STT liên tục */}
                            <td>{review.user_name}</td>   {/* tên user */}
                            <td>{review.room_name}</td>   {/* tên room */}
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
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

export default ReviewList;
