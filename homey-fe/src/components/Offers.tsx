import React from "react";

const Offers: React.FC = () => {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Ưu đãi</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-100 p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-2">Vui là chính, không cần dài</h3>
                    <p>Thêm chút nắng vàng cuối mùa và giảm giá tới 15%</p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                        Tìm ưu đãi
                    </button>
                </div>
                <div className="bg-green-100 p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-2">Nghỉ dưỡng trong ngôi nhà mơ ước</h3>
                    <p>Với hàng loạt lựa chọn biệt thự và nhà gỗ</p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                        Đặt ngay
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Offers;
