import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, UserCircle, GraduationCap, ShieldCheck, Sun, Moon, Crown, Building2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function RoleSelect() {
  const navigate = useNavigate();
  const { theme, toggleTheme, loginAs, students, faculty, admins } = useAppContext();

  const handleLogin = (role, id, route) => {
    loginAs(role, id);
    navigate(route);
  };

  const vc = admins.find(a => a.roleLevel === 'VC');
  const dean = admins.find(a => a.roleLevel === 'Dean');
  const hod = admins.find(a => a.roleLevel === 'HOD');
  const student = students[0];
  const fac = faculty[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center relative transition-colors duration-300 py-12">
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
      </button>

      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-university-100 dark:bg-university-900/30 rounded-2xl">
            <BookOpen className="w-12 h-12 text-university-600 dark:text-university-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">University Platform</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-light">Select a Persona to Demo the Platform</p>
      </div>

      <div className="max-w-6xl w-full px-6 space-y-8">
        
        {/* Admin Tier */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 px-2">Administration Tier</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => handleLogin('admin', vc.id, '/admin')} className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 hover:shadow-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all flex items-center space-x-5">
              <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Crown className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Vice Chancellor</h2>
                <p className="text-gray-500 dark:text-gray-400 text-xs">University-wide God View</p>
              </div>
            </div>

            <div onClick={() => handleLogin('admin', dean.id, '/admin')} className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex items-center space-x-5">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Building2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">College Dean</h2>
                <p className="text-gray-500 dark:text-gray-400 text-xs">College-wide Oversight</p>
              </div>
            </div>

            <div onClick={() => handleLogin('admin', hod.id, '/admin')} className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all flex items-center space-x-5">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">HOD (Dept Head)</h2>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Department-level Control</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Tier */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 px-2">Academic Tier</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div onClick={() => handleLogin('faculty', fac.id, '/faculty')} className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:shadow-xl hover:border-teal-500 dark:hover:border-teal-500 transition-all flex items-center space-x-6">
              <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <UserCircle className="w-10 h-10 text-teal-600 dark:text-teal-400 group-hover:text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Faculty Portal</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage batches, create coding assessments, and upload lectures.</p>
              </div>
            </div>

            <div onClick={() => handleLogin('student', student.id, '/student')} className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:shadow-xl hover:border-university-500 dark:hover:border-university-500 transition-all flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:bg-university-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-10 h-10 text-university-600 dark:text-university-400 group-hover:text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Student Portal</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Join contests, practice coding problems, and track rankings.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
