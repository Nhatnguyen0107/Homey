import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/admin/table.css";

interface Booking {
    id: string;
    start_date: string;
    end_date: string;
    quantity: number;
    total_price: number;
    status: string;
    createdAt: string;
    userName: string;
    roomName: string;
}

export default function BookingList() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const navigate = useNavigate();

    // 🧠 Gọi API lấy danh sách bookings
    const fetchBookings = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/bookings");
            setBookings(res.data);
        } catch (error) {
            console.error("❌ Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // ➕ Thêm booking
    const addBooking = () => navigate("/admin/booking-form");

    // ✏️ Sửa booking
    const editBooking = (id?: string) => {
        if (id) navigate(`/admin/booking-form/${id}`);
    };

    // ❌ Xóa booking
    const deleteBooking = async (id?: string) => {
        if (!id) return;
        if (!window.confirm("Bạn có chắc muốn xóa booking này?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/v1/bookings/${id}`);
            fetchBookings(); // Refresh danh sách
        } catch (error) {
            console.error("❌ Error deleting booking:", error);
        }
    };

    // 🔍 Lọc theo userName hoặc roomName
    const filteredBookings = bookings.filter(
        (b) =>
            b.userName?.toLowerCase().includes(search.toLowerCase()) ||
            b.roomName?.toLowerCase().includes(search.toLowerCase())
    );

    // 📄 Phân trang
    const totalPages = Math.ceil(filteredBookings.length / pageSize);
    const displayedBookings = filteredBookings.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    if (loading)
        return (
            <div className="text-center text-gray-500 mt-10">Đang tải dữ liệu...</div>
        );

    return (
        <div className="data-container">
            <div className="data-header">
                <div className="title-name">
                    <h2>Bookings List</h2>
                </div>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by User Name or Room Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Room Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedBookings.length > 0 ? (
                        displayedBookings.map((b, index) => (
                            <tr key={b.id}>
                                <td>{(page - 1) * pageSize + index + 1}</td>
                                <td>{b.userName}</td>
                                <td>{b.roomName}</td>
                                <td>{new Date(b.start_date).toLocaleDateString()}</td>
                                <td>{new Date(b.end_date).toLocaleDateString()}</td>
                                <td>{b.quantity}</td>
                                <td>{b.total_price}</td>
                                <td>
                                    <span
                                        className={`status-tag ${b.status === "confirmed"
                                            ? "status-confirmed"
                                            : b.status === "pending"
                                                ? "status-pending"
                                                : "status-cancelled"
                                            }`}
                                    >
                                        {b.status}
                                    </span>
                                </td>
                                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn-action edit"
                                        onClick={() => editBooking(b.id)}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className="btn-action delete"
                                        onClick={() => deleteBooking(b.id)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={10} className="text-center text-gray-500">
                                Không có booking nào phù hợp.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 📄 Phân trang */}
            <div className="pagination">
                <button
                    className="page-btn"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
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
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
