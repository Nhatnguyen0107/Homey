// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/home";
import Dashboard from "./pages/admin/dashboard/dashboard";
import ProductList from "./pages/admin/products/product-list";
import UserList from "./pages/admin/users/user-list";
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
import Shipping from "./pages/admin/shipping/shipping";
import Profile from "./pages/admin/setting/profile";
import Categories from "./pages/admin/categories/categories";
import CategoriesForm from "./pages/admin/categories/categories-form";
import Tags from "./pages/admin/tags/tags";
import TagsForm from "./pages/admin/tags/tagsForm";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import AccommodationType from "./components/AccommodationType";
import RoomTypeDetail from "./components/RoomTypeDetail";

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
        <Route path="/room-types" element={<AccommodationType />} />
        <Route path="/room-types/:id" element={<RoomTypeDetail />} />

        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="category-list" element={<Categories />} />
            <Route path="category-form" element={<CategoriesForm />} />
            <Route path="category-form/:id" element={<CategoriesForm />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="profile" element={<Profile />} />
            <Route path="tag-list" element={<Tags />} />
            <Route path="tag-form" element={<TagsForm />} />
            <Route path="tag-form/:id" element={<TagsForm />} />
          </Route>
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
