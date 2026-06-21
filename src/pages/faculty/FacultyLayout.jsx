import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Announcements from '../shared/Announcements';
import Sidebar from '../../components/shared/Sidebar';
import Dashboard from './Dashboard';
import MyBatches from './MyBatches';
import UploadLecture from './UploadLecture';
import CreateAssessment from './CreateAssessment';
import StudentRecords from './StudentRecords';
import QuestionLab from './QuestionLab';
import FacultyProfile from './FacultyProfile';
import ContestManager from './ContestManager';

// New Course Management Components
import EnrolledStudents from './courses/EnrolledStudents';
import AssessmentManager from './courses/AssessmentManager';
import QuizCreator from './courses/QuizCreator';
import CurriculumResources from './courses/CurriculumResources';

import { LayoutDashboard, Users, PlaySquare, FileText, ClipboardList, User, Beaker, BookOpen, Trophy , Megaphone  } from 'lucide-react';

export default function FacultyLayout() {
  const navItems = [
    { to: "/faculty", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/faculty/announcements", label: "Notice Board", icon: Megaphone },
    { 
      label: "Course Hub", 
      icon: BookOpen,
      subLinks: [
        { to: "/faculty/courses/students", label: "Enrolled Students" },
        { to: "/faculty/courses/assessments", label: "Assessment Manager" },
        { to: "/faculty/courses/quizzes", label: "Quiz Creator" },
        { to: "/faculty/courses/resources", label: "Curriculum & Resources" },
        { to: "/faculty/courses/upload-lecture", label: "Upload Lecture" },
        { to: "/faculty/courses/create-assessment", label: "Create Assessment" },
        { to: "/faculty/courses/question-lab", label: "Question Bank" },
      ]
    },
    { to: "/faculty/contests", label: "Contest Manager", icon: Trophy },
    { to: "/faculty/batches", label: "My Batches", icon: Users },
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
            <Route path="/courses/students" element={<EnrolledStudents />} />
            <Route path="/courses/assessments" element={<AssessmentManager />} />
            <Route path="/courses/quizzes" element={<QuizCreator />} />
            <Route path="/courses/resources" element={<CurriculumResources />} />
            <Route path="/batches" element={<MyBatches />} />
            <Route path="/courses/upload-lecture" element={<UploadLecture />} />
            <Route path="/courses/create-assessment" element={<CreateAssessment />} />
            <Route path="/records" element={<StudentRecords />} />
            <Route path="/courses/question-lab" element={<QuestionLab />} />
            <Route path="/contests" element={<ContestManager />} />
            <Route path="/profile" element={<FacultyProfile />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="*" element={<Navigate to="/faculty" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
