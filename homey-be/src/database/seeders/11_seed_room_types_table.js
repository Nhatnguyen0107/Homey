"use strict";

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("room_types", [
            {
                name: "Khách sạn",
                description: "Phòng tiêu chuẩn trong các khách sạn tiện nghi.",
                image_url: "/uploads/img/hotel.jpg",
            },
            {
                name: "Căn hộ",
                description: "Không gian rộng rãi, phù hợp cho gia đình hoặc nhóm.",
                image_url: "/uploads/img/apartment.jpg",
            },
            {
                name: "Resort",
                description: "Khu nghỉ dưỡng sang trọng với nhiều tiện ích.",
                image_url: "/uploads/img/resort.webp",
            },
            {
                name: "Biệt thự",
                description: "Không gian riêng tư, đẳng cấp, yên tĩnh.",
                image_url: "/uploads/img/villa.jpg",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("room_types", null, {});
    },
};
