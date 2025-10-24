import { FaSearch, FaEdit, FaTrash, /*FaTrash*/ } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { resetStatus, getRoomList } from "../../../redux/roomSlice";
import "../../../styles/admin/table.css";

const RoomList: React.FC = () => {
    const rooms = useAppSelector((state) => state.room.rooms);
    const pagination = useAppSelector((state) => state.room.pagination);
    // backend nên trả về { data, pagination: { page, pageSize, totalPages, totalItems } }

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getRoomList({ page, pageSize }));
    }, [dispatch, page]);

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (newPage: number) => {
        if (newPage !== page) {
            setPage(newPage);
        }
    };

    // Chuyển hướng tới trang thêm loại phòng
    // function addRoom() {
    //     navigate("/admin/room-form");
    // }

    // const editRoom = (id?: string) => {
    //     if (id) {
    //         navigate(`/admin/category-form/${id}`);
    //     }
    // };


    // const deleteRoom = (id?: string) => {
    //     if (id) {
    //         dispatch(
    //             deleteRoom({
    //                 id,
    //                 // cb: () => {
    //                 //   dispatch(getRoomList({}));
    //                 // },
    //             })
    //         );
    //     }
    // };

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
                        <th>Room Name</th>
                        <th>Description</th>
                        <th>Price (VND)</th>
                        <th>Image</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <td>{room.description}</td>
                            <td>{room.price}</td>
                            <td>{room.image_url}</td>
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
                    ))}
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
                        key={i + 1}
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
