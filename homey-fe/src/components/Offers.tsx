import React from "react";
import uudai1 from "../assets/img/uudai1.png";
import uudai2 from "../assets/img/uudai2.png";

const Offers: React.FC = () => {
    return (
        <section className="bg-[#f9fafb] text-black py-16">
            <div className="max-w-7xl mx-auto px-8">
                {/* Tiêu đề */}
                <h2 className="text-3xl font-bold mb-2">Ưu đãi</h2>
                <p className="text-gray-400 text-lg mb-10">
                    Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn
                </p>

                {/* Grid ưu đãi */}
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Ưu đãi 1 */}
                    <div className="flex bg-[#003580] rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300">
                        <img
                            src={uudai1}
                            alt="Ưu đãi 1"
                            className="w-56 h-56 object-cover flex-shrink-0"
                        />
                        <div className="p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl text-gray-200 font-semibold leading-snug mb-4">
                                    Tiết kiệm ít nhất 15% trong Ngày Độc Thân này
                                </h3>
                                <p className="text-gray-200 text-base">
                                    Nhận ưu đãi hấp dẫn khi đặt phòng ngay hôm nay!
                                </p>
                            </div>
                            <button className="bg-[#006ce4] text-white px-6 py-3 rounded-md font-medium mt-6 w-fit hover:bg-[#0051b3] transition">
                                Khám phá ưu đãi
                            </button>
                        </div>
                    </div>

                    {/* Ưu đãi 2 */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                        <img
                            src={uudai2}
                            alt="Ưu đãi 2"
                            className="w-full h-56 object-cover brightness-75 group-hover:brightness-90 transition"
                        />
                        <div className="absolute inset-0 flex flex-col justify-between p-8">
                            <div>
                                <p className="text-sm text-gray-200">Ưu Đãi Cuối Năm</p>
                                <h3 className="text-2xl text-gray-200 font-bold mt-2 leading-snug">
                                    Vui là chính, không cần dài
                                </h3>
                                <p className="text-gray-300 text-base mt-2">
                                    Tận hưởng thêm chút nắng vàng cuối mùa với giảm giá tối thiểu
                                    15%
                                </p>
                            </div>
                            <button className="bg-[#006ce4] text-white px-6 py-3 rounded-md font-medium mt-6 w-fit hover:bg-[#0051b3] transition">
                                Tìm ưu đãi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Offers;
