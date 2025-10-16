import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, /*useState*/ } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
// import { useNavigate } from "react-router-dom";
import { resetStatus, getBookingList } from "../../../redux/bookingSlice";
import "../../../styles/admin/table.css";

const BookingList: React.FC = () => {
    // const [search, setSearch] = useState("");
    // const [sortAsc, setSortAsc] = useState(true);
    const bookings = useAppSelector((state) => state.booking.bookings);
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getBookingList({}));
    }, []);

    return (
        <div className="data-container">
            <div className="data-header">
                <h2>Booking List</h2>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search users..." />
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Quantity</th>
                        <th>Total price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.start_date}</td>
                            <td>{book.end_date}</td>
                            <td>{book.quantity}</td>
                            <td>{book.total_price}</td>
                            <td>{book.status}</td>
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

export default BookingList;
