// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/home";
import Dashboard from "./pages/admin/dashboard/dashboard";
import RoomList from "./pages/admin/rooms/room-list";
import UserList from "./pages/admin/users/user-list";
import BookingList from "./pages/admin/booking/booking-list";
import PromotionList from "./pages/admin/promotions/promotion-list";
import ReviewList from "./pages/admin/reviews/review-list";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Admin from "./pages/admin/admin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { getMe } from "./redux/authSlice";
import { useAuth } from "./hooks/useAuth";
import NotFound from "./NotFound";
import Profile from "./pages/admin/setting/profile";
import CategoriesList from "./pages/admin/categories/categories-list";
import CategoriesForm from "./pages/admin/categories/categories-form";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import AccommodationType from "./components/AccommodationType";
import RoomTypeDetail from "./pages/RoomTypeDetail";
import RoomDetailPage from "./pages/RoomDetailPage";
// import RoomDetail from "./pages/RoomDetail";
import CategoryRoomsPage from "./pages/CategoryRoomsPage";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  // Nếu đã login → lấy thông tin user
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMe());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <AuthProvider>
      <Header />

      <Routes>

        {/* điều hướng tới trang con loại phòng */}
        <Route path="/" element={<Home />} />
        <Route path="/" element={<AccommodationType />} />
        <Route path="/categories/:id" element={<CategoryRoomsPage />} />
        <Route path="/room-types/:id" element={<RoomTypeDetail />} />


        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route path="/room/:id" element={<RoomDetailPage />} />

        <Route element={<PublicRoute />}>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="room-list" element={<RoomList />} />
            <Route path="booking-list" element={<BookingList />} />
            <Route path="promotion-list" element={<PromotionList />} />
            <Route path="review-list" element={<ReviewList />} />
            <Route path="category-list" element={<CategoriesList />} />
            <Route path="category-form" element={<CategoriesForm />} />
            <Route path="category-form/:id" element={<CategoriesForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>


        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
