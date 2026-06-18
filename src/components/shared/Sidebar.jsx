import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ links }) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-65px)] sticky top-[65px] hidden lg:flex flex-col py-6 px-3">
      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-university-50 dark:bg-university-900/30 text-university-700 dark:text-university-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              <Icon className="mr-3 w-5 h-5 flex-shrink-0" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
