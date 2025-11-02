import React from "react";
import vnIcon from "../assets/img/Vn.png"; // kiểm tra tên file cho đúng (vn.png hoặc Vn.png)
import footer1 from "../assets/img/footer1.png"; // logo đầu tiên
import footer2 from "../assets/img/footer2.png";
import footer3 from "../assets/img/footer3.png";


const Footer: React.FC = () => {
    return (
        <footer className="bg-[#1c1c1c] text-gray-300 py-10 mt-10 border-t border-gray-700">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm px-4">
                {/* Cột 1 */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Hỗ trợ</h3>
                    <ul className="space-y-2">
                        <li>Quản lí các chuyến đi của bạn</li>
                        <li>Liên hệ Dịch vụ Khách hàng</li>
                        <li>Trung tâm thông tin bảo mật</li>
                    </ul>
                </div>

                {/* Cột 2 */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Khám phá thêm</h3>
                    <ul className="space-y-2">
                        <li>Chương trình khách hàng thân thiết Genius</li>
                        <li>Ưu đãi theo mùa và dịp lễ</li>
                        <li>Bài viết về du lịch</li>
                        <li>Traveller Review Awards</li>
                    </ul>
                </div>

                {/* Cột 3 */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Điều khoản và cài đặt</h3>
                    <ul className="space-y-2">
                        <li>Bảo mật & Cookie</li>
                        <li>Điều khoản dịch vụ</li>
                        <li>Chính sách về Khả năng tiếp cận</li>
                        <li>Chính sách về Quyền con người</li>
                    </ul>
                </div>

                {/* Cột 4 */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Về chúng tôi</h3>
                    <ul className="space-y-2">
                        <li>Về Booking Clone</li>
                        <li>Hoạt động của chúng tôi</li>
                        <li>Du lịch bền vững</li>
                        <li>Liên hệ công ty</li>
                    </ul>
                </div>
            </div>

            {/* Quốc kỳ + đơn vị tiền */}
            <div className="flex items-center justify-center gap-2 mt-10 text-sm">
                <img src={vnIcon} alt="VN" className="w-5 h-5" />
                <span className="text-gray-300">VND</span>
            </div>

            {/* Dòng bản quyền */}
            <div className="text-center text-xs text-gray-400 mt-6">
                <p>
                    Booking Clone là một phần của Booking Holdings Inc., tập đoàn dẫn đầu
                    thế giới về du lịch trực tuyến và các dịch vụ liên quan.
                </p>
                <p className="mt-2">
                    Bản quyền © 1996–2025 Booking Clone™. Bảo lưu mọi quyền.
                </p>
            </div>

            {/* Logo cuối */}
            <div className="flex items-center justify-center gap-6 mt-6">
                <img src={footer1} alt="footer1" className="h-6 opacity-80 hover:opacity-100 transition" />
                <img src={footer2} alt="footer2" className="h-6 opacity-80 hover:opacity-100 transition" />
                <img src={footer3} alt="footer3" className="h-6 opacity-80 hover:opacity-100 transition" />

            </div>
        </footer>
    );
};

export default Footer;
