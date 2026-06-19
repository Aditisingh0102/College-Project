import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SidebarItem = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const Icon = link.icon;

  // Auto-open if a sublink is active
  useEffect(() => {
    if (link.subLinks) {
      const isActiveChild = link.subLinks.some(sub => location.pathname.startsWith(sub.to));
      if (isActiveChild) {
        setIsOpen(true);
      }
    }
  }, [location.pathname, link.subLinks]);

  if (link.subLinks) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        >
          <div className="flex items-center">
            <Icon className="mr-3 w-5 h-5 flex-shrink-0" />
            {link.label}
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {isOpen && (
          <div className="pl-11 pr-2 py-1 space-y-1">
            {link.subLinks.map(sub => (
              <NavLink
                key={sub.to}
                to={sub.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-university-50 dark:bg-university-900/30 text-university-700 dark:text-university-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`
                }
              >
                {sub.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
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
};

export default function Sidebar({ links }) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-65px)] sticky top-[65px] hidden lg:flex flex-col py-6 px-3 overflow-y-auto custom-scrollbar">
      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <SidebarItem key={link.label} link={link} />
        ))}
      </nav>
    </aside>
  );
}
