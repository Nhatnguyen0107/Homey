import React, { createContext, useState, useContext } from "react";

interface RoomInfo {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface BookingInfo {
    room: RoomInfo | null;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
}

interface BookingContextType {
    booking: BookingInfo;
    selectRoom: (room: RoomInfo) => void;
    updateBooking: (info: Partial<BookingInfo>) => void;
    resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({
    booking: {
        room: null,
        checkIn: "",
        checkOut: "",
        guests: 1,
        totalPrice: 0,
    },
    selectRoom: () => { },
    updateBooking: () => { },
    resetBooking: () => { },
});

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [booking, setBooking] = useState<BookingInfo>({
        room: null,
        checkIn: "",
        checkOut: "",
        guests: 1,
        totalPrice: 0,
    });

    const selectRoom = (room: RoomInfo) => {
        setBooking((prev) => ({
            ...prev,
            room,
            totalPrice: room.price,
        }));
    };

    const updateBooking = (info: Partial<BookingInfo>) => {
        setBooking((prev) => ({
            ...prev,
            ...info,
        }));
    };

    const resetBooking = () => {
        setBooking({
            room: null,
            checkIn: "",
            checkOut: "",
            guests: 1,
            totalPrice: 0,
        });
    };

    return (
        <BookingContext.Provider value={{ booking, selectRoom, updateBooking, resetBooking }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);
