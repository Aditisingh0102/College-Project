import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut, ChevronDown, BookOpen } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Navbar({ title = "Portal" }) {
  const { theme, toggleTheme, currentUser, activeRole, logout, loginAs, students, faculty, admins } = useAppContext();
  const navigate = useNavigate();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSwitchRole = (role) => {
    if (role === 'student') loginAs('student', students[0].id);
    else if (role === 'faculty') loginAs('faculty', faculty[0].id);
    else if (role === 'admin') loginAs('admin', admins[0].id);
    navigate(`/${role}`);
    setShowRoleSwitcher(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors">
      <div className="flex items-center space-x-3">
        <BookOpen className="w-8 h-8 text-university-600 dark:text-university-400" />
        <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">Apex University</span>
        <span className="text-gray-400 dark:text-gray-500 mx-2 hidden sm:block">|</span>
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300 capitalize">{activeRole} {title}</span>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center space-x-3 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            <img src={currentUser?.photoUrl} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700" />
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{activeRole}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showRoleSwitcher && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg py-2 overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Switch Portal</p>
              </div>
              <button onClick={() => handleSwitchRole('student')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center">
                Student Portal
              </button>
              <button onClick={() => handleSwitchRole('faculty')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center">
                Faculty Portal
              </button>
              <button onClick={() => handleSwitchRole('admin')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center">
                Admin Portal
              </button>
              <div className="border-t border-gray-100 dark:border-gray-800 mt-1 pt-1">
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
