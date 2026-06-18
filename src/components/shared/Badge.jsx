import React from 'react';

export default function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    primary: "bg-university-100 text-university-800 dark:bg-university-900/30 dark:text-university-400",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
}
