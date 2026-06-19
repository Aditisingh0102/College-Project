import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut, ChevronDown, BookOpen, Bell } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Navbar({ title = "Portal" }) {
  const { theme, toggleTheme, currentUser, activeRole, logout, loginAs, students, faculty, admins } = useAppContext();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'New Contest Live: Weekly Coding #45', time: '5m ago', unread: true },
    { id: 2, text: 'Dr. Sharma published a new lecture', time: '1h ago', unread: true },
    { id: 3, text: 'System Maintenance scheduled for tomorrow', time: '1d ago', unread: false },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSwitchRole = (role) => {
    if (role === 'student') loginAs('student', students[0].id);
    else if (role === 'faculty') loginAs('faculty', faculty[0].id);
    else if (role === 'admin') loginAs('admin', admins[0].id);
    navigate(`/${role}`);
    setShowProfileMenu(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors">
      <div className="flex items-center space-x-3">
        <BookOpen className="w-8 h-8 text-university-600 dark:text-university-400" />
        <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">University Platform</span>
        <span className="text-gray-400 dark:text-gray-500 mx-2 hidden sm:block">|</span>
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300 capitalize">{activeRole} {title}</span>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                <span className="text-xs text-university-600 dark:text-university-400 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`p-4 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer ${n.unread ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                    <p className={`text-sm ${n.unread ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{n.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
            className="flex items-center space-x-3 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            <img src={currentUser?.photoUrl} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700" />
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{activeRole}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showProfileMenu && (
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
