import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
// import AdminHome from "./pages/AdminHome";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ công khai */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <Home />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminHome />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
