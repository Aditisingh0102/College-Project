import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import RoleSelect from './pages/RoleSelect';
import StudentLayout from './pages/student/StudentLayout';
import FacultyLayout from './pages/faculty/FacultyLayout';
import AdminLayout from './pages/admin/AdminLayout';

export default function App() {
  const { theme } = useAppContext();
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelect />} />
          <Route path="/student/*" element={<StudentLayout />} />
          <Route path="/faculty/*" element={<FacultyLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
