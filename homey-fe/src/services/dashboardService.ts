import axiosClient from "./axiosClient";

export interface DashboardStats {
    totalUsers: number;
    totalRooms: number;
    totalBookings: number;
    totalRevenue: number;
    recentBookings: any[];
    monthlyRevenue: any[];
    roomsByCategory: any[];
}

export const DashboardService = {
    async getDashboardStats(): Promise<DashboardStats> {
        try {
            // Sử dụng API dashboard chuyên dụng nếu có
            const response = await axiosClient.get("/dashboard/stats");

            if (response.data.success) {
                return response.data.data;
            }

            // Fallback: Lấy từ các API riêng lẻ nếu dashboard API không hoạt động
            return await this.getFallbackStats();

        } catch (error) {
            console.error("Error fetching dashboard stats from API, trying fallback:", error);
            // Fallback khi API dashboard không hoạt động
            return await this.getFallbackStats();
        }
    },

    async getFallbackStats(): Promise<DashboardStats> {
        try {
            // Lấy tất cả dữ liệu cần thiết song song
            const [usersRes, roomsRes, bookingsRes, paymentsRes, categoriesRes] = await Promise.all([
                axiosClient.get("/users").catch(() => ({ data: [] })),
                axiosClient.get("/rooms").catch(() => ({ data: { data: { data: [] } } })),
                axiosClient.get("/bookings").catch(() => ({ data: [] })),
                axiosClient.get("/payments").catch(() => ({ data: [] })),
                axiosClient.get("/categories").catch(() => ({ data: { data: [] } }))
            ]);

            // Tính toán thống kê
            const totalUsers = Array.isArray(usersRes.data) ? usersRes.data.length : 0;
            const totalRooms = roomsRes.data.data?.data?.length || 0;
            const totalBookings = Array.isArray(bookingsRes.data) ? bookingsRes.data.length : 0;

            // Tính tổng doanh thu từ payments
            const payments = Array.isArray(paymentsRes.data) ? paymentsRes.data : paymentsRes.data.data || [];
            const totalRevenue = payments
                .filter((payment: any) => payment.status === "paid")
                .reduce((sum: number, payment: any) => sum + (payment.amount || 0), 0);

            // Lấy booking gần đây (5 booking mới nhất)
            const recentBookings = Array.isArray(bookingsRes.data)
                ? bookingsRes.data.slice(0, 5)
                : [];

            // Thống kê doanh thu theo tháng
            const monthlyRevenue = this.generateMonthlyRevenue(payments);

            // Thống kê phòng theo category
            const rooms = roomsRes.data.data?.data || [];
            const categories = categoriesRes.data.data || [];
            const roomsByCategory = this.calculateRoomsByCategory(rooms, categories);

            return {
                totalUsers,
                totalRooms,
                totalBookings,
                totalRevenue,
                recentBookings,
                monthlyRevenue,
                roomsByCategory
            };
        } catch (error) {
            console.error("Error fetching fallback dashboard stats:", error);
            // Trả về dữ liệu mặc định nếu tất cả đều thất bại
            return {
                totalUsers: 0,
                totalRooms: 0,
                totalBookings: 0,
                totalRevenue: 0,
                recentBookings: [],
                monthlyRevenue: this.getEmptyMonthlyData(),
                roomsByCategory: []
            };
        }
    },

    generateMonthlyRevenue(payments: any[]): any[] {
        const months = [
            "T1", "T2", "T3", "T4", "T5", "T6",
            "T7", "T8", "T9", "T10", "T11", "T12"
        ];

        const currentYear = new Date().getFullYear();
        const monthlyData = months.map((month) => ({
            month,
            revenue: 0
        }));

        // Nhóm payments theo tháng
        payments.forEach((payment: any) => {
            if (payment.status === "paid" && payment.createdAt) {
                const paymentDate = new Date(payment.createdAt);
                if (paymentDate.getFullYear() === currentYear) {
                    const monthIndex = paymentDate.getMonth();
                    monthlyData[monthIndex].revenue += payment.amount || 0;
                }
            }
        });

        return monthlyData;
    },

    calculateRoomsByCategory(rooms: any[], categories: any[]): any[] {
        const categoryStats = categories.map(category => ({
            name: category.name,
            count: rooms.filter(room => room.category_id === category.id).length
        }));

        return categoryStats.filter(stat => stat.count > 0);
    },

    getEmptyMonthlyData(): any[] {
        const months = [
            "T1", "T2", "T3", "T4", "T5", "T6",
            "T7", "T8", "T9", "T10", "T11", "T12"
        ];

        return months.map((month) => ({
            month,
            revenue: 0
        }));
    }
};

export default DashboardService;