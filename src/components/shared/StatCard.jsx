import React from 'react';

export default function StatCard({ title, value, icon: Icon, colorClass = "text-university-600 bg-university-100 dark:text-university-400 dark:bg-university-900/30", onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center space-x-4 shadow-sm transition-all ${onClick ? 'cursor-pointer hover:shadow-md hover:border-university-500' : ''}`}
    >
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
    </div>
  );
}
