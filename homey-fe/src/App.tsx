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
import UsersForm from "./pages/admin/users/user-form";
import RoomsForm from "./pages/admin/rooms/room-form";
import PromotionForm from "./pages/admin/promotions/promotion-form";

import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import AccommodationType from "./components/AccommodationType";
import RoomTypeDetail from "./pages/RoomTypeDetail";
import RoomDetailPage from "./pages/RoomDetailPage";
import CategoryRoomsPage from "./pages/CategoryRoomsPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import BookingHistory from "./pages/BookingHistory";
import Hotel from "./pages/Hotel";
import ActivityPage from "./pages/ActivityPage";
import ChatWidget from "./components/ChatWidget";

// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentList from "./pages/admin/payments/payment-list";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMe());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <AuthProvider>
      <Header />
      <ChatWidget />

      {/* <ToastContainer position="top-center" autoClose={2000} /> */}

      <Routes>
        {/* ✅ Trang người dùng */}
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Home />} />
        <Route path="/accommodation-type" element={<AccommodationType />} />
        <Route path="/categories/:categoryId" element={<CategoryRoomsPage />} />
        <Route path="/room-types/:id" element={<RoomTypeDetail />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/booking-detail" element={<BookingDetailPage />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/activity" element={<ActivityPage />} />

        {/* ✅ Thanh toán */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />

        {/* ✅ Đăng nhập / Đăng ký */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ✅ Trang quản trị */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="room-list" element={<RoomList />} />
            <Route path="booking-list" element={<BookingList />} />
            <Route path="promotion-list" element={<PromotionList />} />
            <Route path="review-list" element={<ReviewList />} />
            <Route path="category-list" element={<CategoriesList />} />
            <Route path="payment-list" element={<PaymentList />} />
            <Route path="category-form" element={<CategoriesForm />} />
            <Route path="category-form/:id" element={<CategoriesForm />} />
            <Route path="user-form" element={<UsersForm />} />
            <Route path="user-form/:id" element={<UsersForm />} />
            <Route path="room-form" element={<RoomsForm />} />
            <Route path="room-form/:id" element={<RoomsForm />} />
            <Route path="promotion-form" element={<PromotionForm />} />
            <Route path="promotion-form/:id" element={<PromotionForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* ✅ Trang không tồn tại */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
