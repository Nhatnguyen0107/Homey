import { useEffect, useState, type ReactNode } from "react";
import {
  FaBars,
  FaChevronDown,
  FaTachometerAlt,
  FaUsers,
  FaBed,
  FaThList,
  FaClipboardList,
  FaTags,
  FaStar,
  FaUserCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import type { Menu } from "../types/menu";
import type { TAny } from "../types/common";

type AdminLayoutProps = {
  children: ReactNode;
};

type MenuType = Menu[];

const menu: MenuType = [
  {
    label: "Dashboard",
    to: "",
    icon: <FaTachometerAlt />, // biểu tượng bảng điều khiển
  },
  {
    label: "Quản lý người dùng",
    to: "user-list",
    icon: <FaUsers />, // người dùng
    children: [],
  },
  {
    label: "Quản lý phòng",
    to: "room-list",
    icon: <FaBed />, // phòng (giường)
    children: [],
  },
  {
    label: "Quản lý danh mục",
    to: "category-list",
    icon: <FaThList />, // danh sách
    children: [],
  },
  {
    label: "Quản lý Booking",
    to: "booking-list",
    icon: <FaClipboardList />, // phiếu/booking
    children: [],
  },
  {
    label: "Quản lý khuyến mãi",
    to: "promotion-list",
    icon: <FaTags />, // thẻ khuyến mãi
    children: [],
  },
  {
    label: "Quản lý đánh giá",
    to: "review-list",
    icon: <FaStar />, // ngôi sao (đánh giá)
    children: [],
  },
  {
    label: "Quản lý thanh toán",
    to: "payment-list",
    icon: <FaClipboardList />, // phiếu/booking
    children: [],
  },
  {
    label: "Cài đặt",
    to: "profile",
    icon: <FaUserCog />, // cài đặt tài khoản
    children: [],
  },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menus, setMenus] = useState(menu);
  const location = useLocation();

  useEffect(() => {
    setMenus((prevMenus: TAny) =>
      prevMenus.map((item: Menu) => {
        return {
          ...item,
          active:
            (item.to && location.pathname.includes(item.to)) ||
            (!item.to && location.pathname === "/admin"),
        };
      })
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex bg-[#f8fafd]">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-200 bg-white shadow-lg border-r border-gray-100 h-screen fixed z-30 top-0 left-0 ${sidebarOpen ? "w-64" : "w-20"
          }`}
      >
        {/* Logo */}
        <Link
          to="/admin"
          className="flex items-center gap-2 px-6 py-6 border-b border-gray-100"
        >
          <img
            src="../src/assets/img/admin.png"
            alt="Homey Admin"
            className="h-15 object-contain"
          />
          <h2>Homey Admin</h2>

        </Link>
        {/* Menu */}
        <nav className="flex-1 flex flex-col px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menus.map((item) =>
              item.isTitle ? (
                <li
                  key={item.label}
                  className="text-xs text-gray-400 uppercase font-bold mt-5 mb-2 px-4"
                >
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer group ${item.active
                      ? "bg-[#f3f1fe] text-[#3d2176] font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span
                      className={`flex-1 truncate ${sidebarOpen ? "inline" : "hidden"
                        }`}
                    >
                      {item.label}
                    </span>
                    {item.badge && sidebarOpen && (
                      <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded-full ${typeof item.badge === "string"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-purple-100 text-purple-600"
                          }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.children &&
                      item.children.length > 0 &&
                      sidebarOpen && <FaChevronDown className="ml-2 text-xs" />}
                  </Link>
                  {/* Submenu */}
                  {item.children && item.children.length > 0 && sidebarOpen && (
                    <ul className="ml-10 mt-1 space-y-1">
                      {item.children.map((sub) => (
                        <li
                          key={sub.label}
                          className={`px-3 py-1 rounded cursor-pointer text-sm ${sub.active
                            ? "bg-[#ede9fe] text-[#3d2176] font-bold"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          {sub.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
        </nav>
        {/* Sidebar Toggle */}
        <button
          className="absolute top-4 right-[-18px] bg-white border border-gray-200 rounded-full shadow p-1 text-gray-500 hover:bg-gray-50 transition md:hidden"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <FaBars />
        </button>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${sidebarOpen ? "ml-64" : "ml-20"
          }`}
      >
        {/* Header */}
        {/* Content */}
        <main className="flex-1 p-6 bg-[#f8fafd]">{children}</main>
        {/* Footer */}
        {/* <footer className="bg-white text-center py-3 text-gray-500 text-sm shadow-inner">
          Copyright © {new Date().getFullYear()} Axelit. All rights reserved
          <span className="text-pink-400 mx-1">♥</span> v1.0.0
        </footer> */}
      </div>
    </div>
  );
};

export default AdminLayout;
