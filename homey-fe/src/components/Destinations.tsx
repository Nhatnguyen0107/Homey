import React from "react";

import hochiminh from "../assets/img/hochiminh.jpg";
import danang from "../assets/img/danang.jpg";
import vungtau from "../assets/img/vungtau.jpg";
import hanoi from "../assets/img/hanoi.jpg";
import dalat from "../assets/img/dalat.jpg";
import vn from '../assets/img/Vn.png'

const destinations = [
    { id: 1, name: "TP. Hồ Chí Minh", image: hochiminh },
    { id: 2, name: "Đà Nẵng", image: danang },
    { id: 3, name: "Vũng Tàu", image: vungtau },
    { id: 4, name: "Hà Nội", image: hanoi },
    { id: 5, name: "Đà Lạt", image: dalat },
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
                        <p className="text-center p-2 font-semibold">{d.name} </p><img className="text-center" src={vn} alt="" />

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Destinations;
