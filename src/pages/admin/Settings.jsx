import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Moon, Sun, Save, ShieldCheck } from 'lucide-react';

export default function Settings() {
  const { currentUser, theme, toggleTheme } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your admin profile and system preferences.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center space-x-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900">
          <img src={currentUser?.photoUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser?.name}</h2>
            <div className="flex items-center mt-1 space-x-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-university-600 dark:text-university-400" />
              <span className="text-gray-600 dark:text-gray-400 font-medium">{currentUser?.role}</span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-gray-500">{currentUser?.college}</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Appearance</h3>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Platform Theme</p>
                <p className="text-sm text-gray-500">Toggle between Light and Dark mode globally.</p>
              </div>
              <button 
                onClick={toggleTheme}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition"
              >
                {theme === 'dark' ? <><Sun className="w-4 h-4 mr-2 text-yellow-500" /> Light Mode</> : <><Moon className="w-4 h-4 mr-2 text-gray-600" /> Dark Mode</>}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Permissions Overview</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser?.permissions?.map(p => (
                <span key={p} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-sm border border-gray-200 dark:border-gray-700">{p}</span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Contact SuperAdmin to elevate permissions.</p>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button className="flex items-center px-6 py-2 bg-university-600 hover:bg-university-700 text-white rounded-xl font-medium transition-colors shadow-sm">
            <Save className="w-4 h-4 mr-2" /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
