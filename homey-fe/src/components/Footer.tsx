import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#1c1c1c] text-gray-400 py-6 mt-10 border-t border-gray-700">
            <div className="max-w-6xl mx-auto text-center text-sm">
                <p>© 2025 Booking Clone. Mọi quyền được bảo lưu.</p>
                <p className="mt-2">
                    Liên hệ hỗ trợ:{" "}
                    <span className="text-blue-400 cursor-pointer hover:underline">
                        support@bookingclone.vn
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
