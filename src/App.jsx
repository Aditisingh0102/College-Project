import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import ToastContainer from './components/shared/ToastContainer';

const StudentLayout = lazy(() => import('./pages/student/StudentLayout'));
const FacultyLayout = lazy(() => import('./pages/faculty/FacultyLayout'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
import RoleSelect from './pages/RoleSelect';

// Lazy loading the main layouts
// Global Loader component
export const GlobalLoader = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-800 border-t-university-600 dark:border-t-university-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading...</p>
    </div>
  </div>
);

export default function App() {
  const { theme } = useAppContext();
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <BrowserRouter>
          <Suspense fallback={<GlobalLoader />}>
            <Routes>
              <Route path="/" element={<RoleSelect />} />
              <Route path="/student/*" element={<StudentLayout />} />
              <Route path="/faculty/*" element={<FacultyLayout />} />
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="*" element={<Navigate to="/student" replace />} />
            </Routes>
          </Suspense>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </div>
  );
}
