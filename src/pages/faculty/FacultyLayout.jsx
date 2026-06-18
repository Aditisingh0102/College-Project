import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Sidebar from '../../components/shared/Sidebar';
import { LayoutDashboard, Users, PlaySquare, FileEdit, ClipboardList, User } from 'lucide-react';

import Dashboard from './Dashboard';

const MyBatches = () => <div className="p-8">My Batches Placeholder</div>;
const UploadLecture = () => <div className="p-8">Upload Lecture Placeholder</div>;
const CreateAssessment = () => <div className="p-8">Create Assessment Placeholder</div>;

export default function FacultyLayout() {
  const navItems = [
    { to: "/faculty", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/faculty/batches", label: "My Batches", icon: Users },
    { to: "/faculty/upload-lecture", label: "Upload Lecture", icon: PlaySquare },
    { to: "/faculty/create-assessment", label: "Create Assessment", icon: FileEdit },
    { to: "/faculty/records", label: "Student Records", icon: ClipboardList },
    { to: "/faculty/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar title="Faculty" />
      <div className="flex flex-1">
        <Sidebar links={navItems} />
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/batches" element={<MyBatches />} />
            <Route path="/upload-lecture" element={<UploadLecture />} />
            <Route path="/create-assessment" element={<CreateAssessment />} />
            <Route path="/records" element={<div className="p-8">Student Records Placeholder</div>} />
            <Route path="/profile" element={<div className="p-8">Profile Placeholder</div>} />
            <Route path="*" element={<Navigate to="/faculty" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
