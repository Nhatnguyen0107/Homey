import React from "react";
const SearchBar: React.FC = () => {

    return (
        <div className="flex flex-wrap gap-4 bg-white shadow-lg p-4 rounded-xl">
            <input type="text" placeholder="Bạn muốn đi đâu?" className="flex-1 border p-2 rounded" />

            <input type="date" className="border p-2 rounded" />
            <input type="date" className="border p-2 rounded" />

            <select className="border p-2 rounded">
                <option>2 người lớn - 0 trẻ em - 1 phòng</option>
            </select>

            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Tìm</button>
        </div>
    )
}

export default SearchBar;