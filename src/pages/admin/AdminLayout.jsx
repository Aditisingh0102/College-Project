import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Navbar from '../../components/shared/Navbar';
import Sidebar from '../../components/shared/Sidebar';
import { LayoutDashboard, Building2, Users, GraduationCap, ClipboardList, Trophy, PieChart, Settings } from 'lucide-react';

import Dashboard from './Dashboard';
import ManageFaculty from './ManageFaculty';
import ManageBatches from './ManageBatches';

const ManageColleges = () => <div className="p-8">Manage Colleges Placeholder</div>;
const ManageStudents = () => <div className="p-8">Manage Students Placeholder</div>;

export default function AdminLayout() {
  const { currentUser } = useAppContext();
  const isVC = currentUser?.roleLevel === 'VC';
  const isDean = currentUser?.roleLevel === 'Dean';
  const showHierarchy = isVC || isDean;

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ...(showHierarchy ? [{ to: "/admin/colleges", label: "Colleges & Hierarchy", icon: Building2 }] : []),
    { to: "/admin/faculty", label: "Manage Faculty", icon: GraduationCap },
    { to: "/admin/students", label: "Manage Students", icon: Users },
    { to: "/admin/batches", label: "Manage Batches", icon: ClipboardList },
    { to: "/admin/contests", label: "All Contests", icon: Trophy },
    { to: "/admin/reports", label: "Reports & Analytics", icon: PieChart },
    { to: "/admin/settings", label: "Settings", icon: Settings },
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
            <Route path="/contests" element={<div className="p-8">All Contests Placeholder</div>} />
            <Route path="/reports" element={<div className="p-8">Reports Placeholder</div>} />
            <Route path="/settings" element={<div className="p-8">Settings Placeholder</div>} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
