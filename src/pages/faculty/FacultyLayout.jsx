import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Sidebar from '../../components/shared/Sidebar';
import Dashboard from './Dashboard';
import MyBatches from './MyBatches';
import UploadLecture from './UploadLecture';
import CreateAssessment from './CreateAssessment';
import StudentRecords from './StudentRecords';
import Proctoring from './Proctoring';
import QuestionLab from './QuestionLab';
import Inbox from './Inbox';
import Profile from '../student/Profile';
import { LayoutDashboard, Users, PlaySquare, FileText, ClipboardList, User, ShieldAlert, Beaker, Inbox as InboxIcon } from 'lucide-react';

export default function FacultyLayout() {
  const navItems = [
    { to: "/faculty", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/faculty/batches", label: "My Batches", icon: Users },
    { to: "/faculty/upload-lecture", label: "Upload Lecture", icon: PlaySquare },
    { to: "/faculty/inbox", label: "Inbox", icon: InboxIcon },
    { to: "/faculty/proctoring", label: "Proctoring", icon: ShieldAlert },
    { to: "/faculty/question-lab", label: "Question Lab", icon: Beaker },
    { to: "/faculty/assessments", label: "Assessments", icon: FileText },
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
            <Route path="/assessments" element={<CreateAssessment />} />
            <Route path="/records" element={<StudentRecords />} />
            <Route path="/proctoring" element={<Proctoring />} />
            <Route path="/question-lab" element={<QuestionLab />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/faculty" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
