import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Dashboard from './Dashboard';
import Problems from './Problems';
import ProblemSolve from './ProblemSolve';
import Contests from './Contests';
import ContestDetail from './ContestDetail';
import ContestLobby from './ContestLobby';
import ContestReport from './ContestReport';
import Batches from './Batches';
import Lectures from './Lectures';
import Roadmaps from './Roadmaps';
import Profile from './Profile';
import { LayoutDashboard, Code2, Trophy, Users, PlaySquare, User, BookOpen, Map } from 'lucide-react';

export default function StudentLayout() {
  const navItems = [
    { to: "/student", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/student/roadmaps", label: "Roadmaps", icon: Map },
    { to: "/student/problems", label: "Problems", icon: Code2 },
    { to: "/student/contests", label: "Contests", icon: Trophy },
    { to: "/student/batches", label: "My Batches", icon: Users },
    { to: "/student/lectures", label: "Lectures", icon: BookOpen },
    { to: "/student/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar title="Student" />
      
      {/* Secondary Horizontal Nav for Student */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[65px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar">
          <div className="flex space-x-1 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-university-50 dark:bg-university-900/40 text-university-600 dark:text-university-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<ProblemSolve />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/contests/:id" element={<ContestDetail />} />
          <Route path="/contests/:id/lobby" element={<ContestLobby />} />
          <Route path="/contests/:id/report" element={<ContestReport />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/student" />} />
        </Routes>
      </main>
    </div>
  );
}
