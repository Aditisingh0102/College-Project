import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Navbar from '../../components/shared/Navbar';
import Announcements from '../shared/Announcements';
import Sidebar from '../../components/shared/Sidebar';
import { LayoutDashboard, Building2, Users, GraduationCap, ClipboardList, Trophy, PieChart, BookOpen , Megaphone, User } from 'lucide-react';

import Dashboard from './Dashboard';
import ManageColleges from './ManageColleges';
import ManageFaculty from './ManageFaculty';
import ManageStudents from './ManageStudents';
import ManageBatches from './ManageBatches';
import AllContests from './AllContests';
import Reports from './Reports';
import AdminProfile from './AdminProfile';
import ManageCourses from './ManageCourses';

export default function AdminLayout() {
  const { currentUser } = useAppContext();
  const isVC = currentUser?.roleLevel === 'VC';
  const isDean = currentUser?.roleLevel === 'Dean';
  const showHierarchy = isVC || isDean;

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/announcements", label: "Notice Board", icon: Megaphone },
    ...(showHierarchy ? [{ to: "/admin/colleges", label: "Colleges & Hierarchy", icon: Building2 }] : []),
    { to: "/admin/faculty", label: "Manage Faculty", icon: GraduationCap },
    { to: "/admin/students", label: "Manage Students", icon: Users },
    { to: "/admin/batches", label: "Manage Batches", icon: ClipboardList },
    { to: "/admin/courses", label: "Training & Courses", icon: BookOpen },
    { to: "/admin/contests", label: "All Contests", icon: Trophy },
    { to: "/admin/reports", label: "Reports & Analytics", icon: PieChart },
    { to: "/admin/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar title="Admin" />
      <div className="flex flex-1">
        <Sidebar links={navItems} />
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/colleges" element={<ManageColleges />} />
            <Route path="/faculty" element={<ManageFaculty />} />
            <Route path="/students" element={<ManageStudents />} />
            <Route path="/batches" element={<ManageBatches />} />
            <Route path="/courses" element={<ManageCourses />} />
            <Route path="/contests" element={<AllContests />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
