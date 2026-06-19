import React, { Suspense, lazy } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import { LayoutDashboard, Code2, Trophy, Users, PlaySquare, User, BookOpen, Map } from 'lucide-react';
import { GlobalLoader } from '../../App';
import { useAppContext } from '../../context/AppContext';

// Lazy loading all student pages
const Dashboard = lazy(() => import('./Dashboard'));
const Problems = lazy(() => import('./Problems'));
const ProblemSolve = lazy(() => import('./ProblemSolve'));
const Contests = lazy(() => import('./Contests'));
const ContestDetail = lazy(() => import('./ContestDetail'));
const ContestLobby = lazy(() => import('./ContestLobby'));
const ContestReport = lazy(() => import('./ContestReport'));
const Batches = lazy(() => import('./Batches'));
const Lectures = lazy(() => import('./Lectures'));
const Courses = lazy(() => import('./Courses'));
const CourseDetail = lazy(() => import('./CourseDetail'));
const Profile = lazy(() => import('./Profile'));
const Placements = lazy(() => import('./Placements'));

export default function StudentLayout() {
  const { currentUser } = useAppContext();

  const navItems = [
    { to: "/student", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/student/courses", label: "Courses", icon: Map },
    { to: "/student/problems", label: "Problems", icon: Code2 },
    { to: "/student/contests", label: "Contests", icon: Trophy },
    { to: "/student/lectures", label: "Lectures", icon: BookOpen },
    { to: "/student/placements", label: "Placements", icon: Users },
    { to: "/student/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <Navbar title="Student" />
      
      {/* Secondary Horizontal Nav for Student */}
      <div className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-gray-800 sticky top-[65px] z-40 transition-colors duration-300">
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
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222] hover:text-gray-900 dark:hover:text-white'
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
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemSolve />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/contests/:id" element={<ContestDetail />} />
            <Route path="/contests/:id/lobby" element={<ContestLobby />} />
            <Route path="/contests/:id/report" element={<ContestReport />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="*" element={<Navigate to="/student" />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
