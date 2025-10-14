import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { resetStatus, getRoomList } from "../../../redux/roomSlice";
import "../../../styles/admin/table.css";

const RoomList: React.FC = () => {
    // const [search, setSearch] = useState("");
    // const [sortAsc, setSortAsc] = useState(true);
    const rooms = useAppSelector((state) => state.room.rooms);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getRoomList({}));
    }, []);

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

export default RoomList;
