import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
// import { useNavigate } from "react-router-dom";
import { resetStatus, getRoomList } from "../../../redux/roomSlice";
import "../../../styles/admin/table.css";

const RoomList: React.FC = () => {
    const rooms = useAppSelector((state) => state.room.rooms) || [];
    const pagination = useAppSelector((state) => state.room.pagination);
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getRoomList({ page, pageSize }));
    }, [dispatch, page, pageSize]);

    const handlePageChange = (newPage: number) => {
        if (newPage !== page) setPage(newPage);
    };

    return (
        <div className="data-container">
            <div className="data-header">
                <h2>Room List</h2>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search rooms..." />
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Room Name</th>
                        <th>Description</th>
                        <th>Price (VND)</th>
                        <th>Cities</th>
                        <th>Categories</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(rooms) && rooms.length > 0 ? (
                        rooms.map((room, i) => (
                            <tr key={`${room.id || i}`}>
                                <td>{(page - 1) * pageSize + i + 1}</td>
                                <td>
                                    {room.image_url ? (
                                        <img
                                            src={room.image_url[0]} // hiển thị ảnh đầu tiên
                                            alt={room.name}
                                            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                                        />
                                    ) : (
                                        <span>No image</span>
                                    )}
                                </td>
                                <td>{room.name}</td>
                                <td>{room.description}</td>
                                <td>{room.price}</td>
                                <td>{room.city?.name}</td>
                                <td>{room.category?.name}</td>
                                <td>{room.stock}</td>
                                <td className="action-cell">
                                    <button className="btn-action edit" type="button">
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="btn-action delete" type="button">
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} style={{ textAlign: "center" }}>
                                No rooms found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
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

export default RoomList;
