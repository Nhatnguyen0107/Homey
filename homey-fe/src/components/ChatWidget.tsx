// ChatWidget.tsx
import React, { useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "support", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { from: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        // Giả lập phản hồi sau 1.5s
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { from: "support", text: "Cảm ơn bạn! Nhân viên sẽ sớm phản hồi." },
            ]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen ? (
                <div className="bg-white shadow-xl rounded-2xl w-80 h-96 flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-2xl">
                        <span>💬 Hỗ trợ khách hàng</span>
                        <FaTimes className="cursor-pointer" onClick={() => setIsOpen(false)} />
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg max-w-[80%] ${m.from === "user"
                                        ? "bg-blue-500 text-white ml-auto"
                                        : "bg-gray-200 text-gray-900"
                                    }`}
                            >
                                {m.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t flex">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 border rounded-lg px-2 py-1 mr-2 text-sm"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
                >
                    <FaCommentDots size={22} />
                </button>
            )}
        </div>
    );
}
