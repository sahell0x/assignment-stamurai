import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  color 
}) => {
  return (
    <div className={`p-6 rounded-lg shadow-sm ${color} transition-transform hover:scale-[1.02] duration-300`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="p-2 rounded-full bg-white bg-opacity-70">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;