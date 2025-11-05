// src/components/SearchBar.tsx
import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (term: string) => void; // callback gửi lên Home
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [term, setTerm] = useState("");

    const handleSearch = () => {
        onSearch(term.trim()); // gửi giá trị tìm kiếm
    };

    return (
        <div className="flex flex-wrap gap-4 bg-white shadow-lg p-4 rounded-xl">
            <input
                type="text"
                placeholder="Nhập phòng cần tìm..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="flex-1 border p-2 rounded"
            />

            <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Tìm
            </button>
        </div>
    );
};

export default SearchBar;
