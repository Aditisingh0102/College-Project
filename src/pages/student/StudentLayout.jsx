import React, { Suspense, lazy } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Sidebar from '../../components/shared/Sidebar';
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
      
      <div className="flex flex-1">
        <Sidebar links={navItems} />
        
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto">
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
    </div>
  );
}
