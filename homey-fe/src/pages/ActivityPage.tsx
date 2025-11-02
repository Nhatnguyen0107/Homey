import React from "react";

import Footer from "../components/Footer";

export default function ActivityPage() {
    return (
        <div className="bg-white text-gray-900 min-h-screen flex flex-col">


            {/* Main Content */}
            <main className="flex-grow py-10 px-6 md:px-20">
                <h1 className="text-3xl font-bold mb-2 text-blue-900">
                    Chúng tôi hoạt động như thế nào
                </h1>
                <p className="text-gray-600 mb-6">
                    Cập nhật ngày 31 tháng 5 năm 2025
                </p>

                <h2 className="text-2xl font-semibold mb-3">Mục lục</h2>
                <ul className="list-decimal ml-5 space-y-1 mb-8">
                    <li>Chỗ nghỉ</li>
                    <li>Hoạt động tham quan</li>
                    <li>Thuê ô tô</li>
                    <li>Chuyến bay</li>
                    <li>Dịch vụ vận chuyển công cộng và vận chuyển riêng</li>
                </ul>

                <section className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                            1. Chỗ nghỉ
                        </h2>

                        <div className="space-y-5 text-gray-700 leading-relaxed">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    1A. Các định nghĩa và giới thiệu về chúng tôi
                                </h3>
                                <p>
                                    Một số từ ngữ trong văn bản này có ý nghĩa cụ thể, vì vậy vui lòng
                                    kiểm tra “Từ điển Booking.com” trong{" "}
                                    <a href="#" className="text-blue-600 underline">
                                        Điều khoản Dịch vụ
                                    </a>
                                    .
                                </p>
                                <p>
                                    Khi bạn đặt Chỗ nghỉ, <strong>Booking.com B.V.</strong> cung cấp và
                                    chịu trách nhiệm về Nền tảng chứ không phải cho chính Trải nghiệm Du
                                    lịch đó (mục 1B). Booking.com B.V. là công ty được thành lập theo
                                    luật pháp của Hà Lan (địa chỉ đăng ký: Oosterdoksstraat 163, 1011 DL,
                                    Amsterdam, Hà Lan; số đăng ký Phòng Thương mại: 31047344; mã số thuế:
                                    NL805734958B01).
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    1B. Dịch vụ của chúng tôi hoạt động như thế nào?
                                </h3>
                                <p>
                                    Chúng tôi giúp bạn dễ dàng so sánh các đơn đặt từ nhiều khách sạn,
                                    chỗ ở nghỉ và các Nhà cung cấp Dịch vụ khác. Khi bạn hoàn tất đơn đặt
                                    trên nền tảng của chúng tôi, bạn tham gia ký kết hợp đồng với Nhà
                                    cung cấp Dịch vụ mà bạn chọn (trừ khi có ghi chú khác).
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    1C. Chúng tôi làm việc với ai?
                                </h3>
                                <p>
                                    Chỉ các Nhà cung cấp Dịch vụ có quan hệ hợp đồng với chúng tôi mới
                                    được hiển thị trên nền tảng. Các nhà cung cấp này có thể là khách sạn,
                                    chủ nhà hoặc công ty du lịch địa phương.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    1D. Chúng tôi có doanh thu từ đâu?
                                </h3>
                                <p>
                                    Chúng tôi không mua hoặc bán lại bất kỳ sản phẩm nào. Khi bạn hoàn tất
                                    đơn đặt, chúng tôi nhận một khoản hoa hồng từ Nhà cung cấp Dịch vụ —
                                    khoản này không ảnh hưởng đến giá bạn phải trả.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    1E. Hệ thống đề xuất gợi ý của chúng tôi
                                </h3>
                                <p>
                                    Chúng tôi sắp xếp kết quả tìm kiếm dựa trên các yếu tố như mức độ phổ
                                    biến, đánh giá của khách hàng, khoảng cách đến trung tâm, giá cả, và
                                    các chương trình khuyến mãi. Mục tiêu là giúp bạn dễ dàng tìm được lựa
                                    chọn phù hợp nhất.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">1F. Đánh giá</h3>
                                <p>
                                    Đánh giá của khách được thu thập sau khi khách lưu trú thực tế. Chúng
                                    tôi hiển thị các đánh giá để phản ánh trung thực trải nghiệm của khách
                                    hàng.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">1G. Giá</h3>
                                <p>
                                    Mức giá hiển thị trên Nền tảng của chúng tôi là do các Nhà cung cấp
                                    Dịch vụ đặt ra. Giá có thể được hiển thị theo đêm hoặc toàn bộ kỳ
                                    nghỉ, bao gồm hoặc chưa bao gồm thuế và phí.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">1H. Thanh toán</h3>
                                <p>
                                    Tùy từng chỗ nghỉ, bạn có thể thanh toán trước, khi nhận phòng hoặc
                                    sau khi lưu trú. Một số đơn đặt yêu cầu thông tin thẻ tín dụng để xác
                                    nhận.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">1I. Loại host</h3>
                                <p>
                                    Chúng tôi hiển thị loại hình chủ sở hữu chỗ nghỉ (ví dụ: cá nhân, doanh
                                    nghiệp hoặc tổ chức du lịch) để khách dễ dàng biết mình đang giao dịch
                                    với ai.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    1J. Xếp hạng sao, điểm đánh giá và đánh giá chất lượng
                                </h3>
                                <p>
                                    Xếp hạng sao được cung cấp bởi các Nhà cung cấp Dịch vụ hoặc được xác
                                    định dựa trên tiêu chí nội bộ của chúng tôi, giúp bạn đánh giá mức độ
                                    tiện nghi của chỗ nghỉ.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    1K. Trợ giúp và tư vấn – nếu điều bất ngờ xảy ra
                                </h3>
                                <p>
                                    Nếu bạn gặp sự cố trong quá trình lưu trú, đội ngũ hỗ trợ 24/7 của
                                    chúng tôi luôn sẵn sàng giúp bạn giải quyết nhanh chóng và hiệu quả.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">1L. Quá tải đơn đặt</h3>
                                <p>
                                    Trong trường hợp chỗ nghỉ không còn khả năng nhận khách, chúng tôi sẽ
                                    hỗ trợ bạn tìm một giải pháp thay thế phù hợp nhất mà không phát sinh
                                    thêm chi phí.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <p className="text-sm text-gray-500 mt-10">
                    *Lưu ý: Đây là phiên bản rút gọn mô phỏng lại nội dung “Chúng tôi hoạt động như thế nào” để hiển thị trên giao diện web.
                </p>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
