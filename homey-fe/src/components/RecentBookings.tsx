import React from "react";

interface RecentBookingsProps {
    bookings: any[];
    loading: boolean;
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings, loading }) => {
    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="animate-pulse space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-12 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Đặt Phòng Gần Đây</h3>
            <div className="space-y-3">
                {bookings.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Không có đặt phòng gần đây</p>
                ) : (
                    bookings.map((booking, index) => (
                        <div key={booking.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                    Đặt phòng #{booking.id || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {booking.guest_name || 'Khách không rõ'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {booking.check_in_date ? new Date(booking.check_in_date).toLocaleDateString('vi-VN') : 'Không có ngày'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                    {booking.total_amount ? `${booking.total_amount.toLocaleString('vi-VN')} VNĐ` : '0 VNĐ'}
                                </p>
                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${booking.status === 'confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : booking.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : booking.status === 'cancelled'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {booking.status === 'confirmed' ? 'Đã xác nhận' :
                                        booking.status === 'pending' ? 'Chờ xử lý' :
                                            booking.status === 'cancelled' ? 'Đã hủy' :
                                                booking.status === 'completed' ? 'Hoàn thành' :
                                                    booking.status || 'Không rõ'}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentBookings;