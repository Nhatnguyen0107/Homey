import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import type { AppDispatch, RootState } from "../../../redux/store";
import { fetchDashboardStats } from "../../../redux/dashboardSlice";
import StatCard from "../../../components/StatCard";
import RecentBookings from "../../../components/RecentBookings";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Lỗi: </strong>{error}
        </div>
      </div>
    );
  }

  // Chart data cho monthly revenue
  const monthlyRevenueData = {
    labels: stats?.monthlyRevenue?.map(item => item.month) || [],
    datasets: [
      {
        label: "Doanh Thu Tháng (VNĐ)",
        data: stats?.monthlyRevenue?.map(item => item.revenue) || [],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  // Chart data cho rooms by category
  const roomsByCategoryData = {
    labels: stats?.roomsByCategory?.map(item => item.name) || [],
    datasets: [
      {
        data: stats?.roomsByCategory?.map(item => item.count) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40"
        ],
        borderWidth: 2,
        borderColor: "#fff"
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: { font: { size: 12 } }
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { padding: 20, font: { size: 12 } }
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Tổng Quan Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Tổng Người Dùng"
            value={stats?.totalUsers || 0}
            icon="👥"
            color="border-l-4 border-blue-500"
            subtitle="Người dùng đã đăng ký"
          />
          <StatCard
            title="Tổng Phòng"
            value={stats?.totalRooms || 0}
            icon="🏨"
            color="border-l-4 border-green-500"
            subtitle="Phòng có sẵn"
          />
          <StatCard
            title="Tổng Đặt Phòng"
            value={stats?.totalBookings || 0}
            icon="📅"
            color="border-l-4 border-yellow-500"
            subtitle="Tổng số lượt đặt phòng"
          />
          <StatCard
            title="Tổng Doanh Thu"
            value={stats?.totalRevenue || 0}
            icon="💰"
            color="border-l-4 border-purple-500"
            subtitle="Từ các đơn đã thanh toán"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Doanh Thu Theo Tháng (2025)
            </h3>
            <div className="h-80">
              <Bar data={monthlyRevenueData} options={chartOptions} />
            </div>
          </div>

          {/* Rooms by Category Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Phòng Theo Danh Mục
            </h3>
            <div className="h-80">
              {stats?.roomsByCategory && stats.roomsByCategory.length > 0 ? (
                <Doughnut data={roomsByCategoryData} options={doughnutOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Không có dữ liệu phòng
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <RecentBookings
            bookings={stats?.recentBookings || []}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;