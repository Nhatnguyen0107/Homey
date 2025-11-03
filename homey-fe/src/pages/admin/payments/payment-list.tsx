import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
    resetStatus,
    getPaymentList,
    deletePayment,
    updatePayment
} from "../../../redux/paymentSlice";
import "../../../styles/admin/table.css";
import type { Payment } from "../../../types/payment";

const PaymentList: React.FC = () => {
    const dispatch = useAppDispatch();
    const payments = useAppSelector((state) => state.payment.payments) || [];
    const pagination = useAppSelector((state) => state.payment.pagination);
    const loading = useAppSelector((state) => state.payment.loading);
    const error = useAppSelector((state) => state.payment.error);

    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(resetStatus());
        dispatch(getPaymentList({ page, pageSize, search }));
    }, [dispatch, page, pageSize]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1); // reset to page 1 when searching
            dispatch(getPaymentList({ page: 1, pageSize, search }));
        }, 500);

        return () => clearTimeout(timer);
    }, [search, dispatch, pageSize]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
            setPage(newPage);
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa payment này?")) {
            dispatch(deletePayment(id)).then(() => {
                // Refresh list after delete
                dispatch(getPaymentList({ page, pageSize, search }));
            });
        }
    };

    const handleMarkPaid = (payment: Payment) => {
        if (payment.status !== "paid") {
            dispatch(updatePayment({ id: payment.id, data: { status: "paid" } })).then(() => {
                // Refresh list after update
                dispatch(getPaymentList({ page, pageSize, search }));
            });
        }
    };

    return (
        <div className="data-container">
            <div className="data-header">
                <h2>Payment List</h2>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search payments..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <table className="data-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Room Name</th>
                        <th>Booking ID</th>
                        <th>Method</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length === 0 && !loading ? (
                        <tr>
                            <td colSpan={9} style={{ textAlign: "center" }}>
                                No payments found
                            </td>
                        </tr>
                    ) : (
                        payments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td>{(page - 1) * pageSize + index + 1}</td>
                                <td>{payment.userName || "N/A"}</td>
                                <td>{payment.roomName || "N/A"}</td>
                                <td>{payment.booking_id}</td>
                                <td>
                                    <span className={`method-badge ${payment.method}`}>
                                        {payment.method}
                                    </span>
                                </td>
                                <td>${payment.amount}</td>
                                <td>
                                    <span className={`status-badge ${payment.status}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                <td className="action-cell">
                                    {payment.status !== "paid" && (
                                        <button
                                            className="btn-action edit"
                                            onClick={() => handleMarkPaid(payment)}
                                        >
                                            <FaEdit /> Mark Paid
                                        </button>
                                    )}
                                    <button
                                        className="btn-action delete"
                                        onClick={() => handleDelete(payment.id)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
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

export default PaymentList;
