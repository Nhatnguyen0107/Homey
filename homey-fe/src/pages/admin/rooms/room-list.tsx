import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import {
    getRoomList,
    resetStatus,
    deleteRoom,
} from "../../../redux/roomSlice";
import "../../../styles/admin/table.css";

const RoomList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const rooms = useAppSelector((state) => state.room.rooms) || [];
    const pagination = useAppSelector((state) => state.room.pagination);

    const [page, setPage] = useState(1);
    const [pageSize] = useState(5); // số lượng mỗi trang
    const [search, setSearch] = useState(""); // từ khóa tìm kiếm

    // Load danh sách khi page thay đổi hoặc lần đầu
    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getRoomList({ page, pageSize, search }));
    }, [dispatch, page, pageSize]);

    // Tìm kiếm với debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1); // reset về trang 1 khi search
            dispatch(getRoomList({ page: 1, pageSize, search }));
        }, 500);

        return () => clearTimeout(timer);
    }, [search, dispatch, pageSize]);

    const addRoom = () => {
        navigate("/admin/room-form");
    };

    const editRoom = (id?: string) => {
        if (id) navigate(`/admin/room-form/${id}`);
    };

    const deleteRoomItem = (id?: string) => {
        if (id) {
            dispatch(
                deleteRoom({
                    id,
                    cb: () => {
                        dispatch(getRoomList({ page, pageSize, search }));
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
                    <h2>Room List</h2>
                    <button className="btn-add" onClick={addRoom}>
                        <FaPlus /> Add Room
                    </button>
                </div>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Room Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>City</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.length > 0 ? (
                        rooms.map((room, index) => (
                            <tr key={room.id}>
                                <td>{(page - 1) * pageSize + index + 1}</td>
                                <td>
                                    {room.image_url?.length ? (
                                        <img
                                            src={
                                                room.image_url?.[0]?.startsWith("http")
                                                    ? room.image_url[0]
                                                    : `http://localhost:3000${room.image_url[0]}`
                                            }
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
                                <td>
                                    <button
                                        className="btn-action edit"
                                        onClick={() => editRoom(room.id)}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className="btn-action delete"
                                        onClick={() => deleteRoomItem(room.id)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} style={{ textAlign: "center" }}>
                                No rooms found.
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

export default RoomList;
