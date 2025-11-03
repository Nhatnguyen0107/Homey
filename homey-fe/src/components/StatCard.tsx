import React from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, subtitle }) => {
    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">
                        {typeof value === 'number' && title.toLowerCase().includes('doanh thu')
                            ? `${value.toLocaleString('vi-VN')} VNĐ`
                            : value.toLocaleString('vi-VN')}
                    </p>
                    {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
                </div>
                <div className="text-4xl">{icon}</div>
            </div>
        </div>
    );
};

export default StatCard;