import React from "react";

const destinations = [
    { id: 1, name: "TP. Hồ Chí Minh", image: "../assets/img/hochiminh.jpg" },
    { id: 2, name: "Đà Nẵng", image: "../assets/img/danang.jpg" },
    { id: 3, name: "Vũng Tàu", image: "../assets/img/vungtau.jpg" },
    { id: 4, name: "Hà Nội", image: "../assets/img/hanoi.jpg" },
    { id: 5, name: "Đà Lạt", image: "../assets/img/dalat.jpg" },
];

const Destinations: React.FC = () => {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Điểm đến đang thịnh hành</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {destinations.map((d) => (
                    <div
                        key={d.id}
                        className="rounded-xl overflow-hidden shadow hover:scale-105 transition"
                    >
                        <img src={d.image} alt={d.name} className="w-full h-40 object-cover" />
                        <p className="text-center p-2 font-semibold">{d.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Destinations;
