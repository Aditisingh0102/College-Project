import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  mockColleges, mockStudents, mockFaculty, mockAdmins, 
  mockProblems, mockContests, mockLectures, mockSubmissions 
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Toast System State
  const [toasts, setToasts] = useState([]);

  // Role and User state with localStorage persistence
  const [activeRole, setActiveRole] = useState(() => {
    const saved = localStorage.getItem('activeRole');
    if (saved) return saved;
    // Auto-login as student if no role is set
    localStorage.setItem('activeRole', 'student');
    return 'student';
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUserId = localStorage.getItem('currentUserId');
    const role = localStorage.getItem('activeRole') || 'student';
    
    if (savedUserId && role) {
      if (role === 'student') return mockStudents.find(s => s.id === savedUserId) || mockStudents[0];
      if (role === 'faculty') return mockFaculty.find(f => f.id === savedUserId) || null;
      if (role === 'admin') return mockAdmins.find(a => a.id === savedUserId) || null;
    }
    
    // Auto-login fallback
    const defaultStudent = mockStudents[0];
    localStorage.setItem('currentUserId', defaultStudent.id);
    return defaultStudent;
  });

  // Mock data state
  const [colleges, setColleges] = useState(mockColleges);
  const [students, setStudents] = useState(mockStudents);
  const [faculty, setFaculty] = useState(mockFaculty);
  const [admins, setAdmins] = useState(mockAdmins);
  const [problems, setProblems] = useState(mockProblems);
  const [contests, setContests] = useState(mockContests);
  const [lectures, setLectures] = useState(mockLectures);
  const [submissions, setSubmissions] = useState(mockSubmissions);

  // Helper functions
  const addToast = (message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const loginAs = (role, userId) => {
    setActiveRole(role);
    localStorage.setItem('activeRole', role);
    localStorage.setItem('currentUserId', userId);
    if (role === 'student') setCurrentUser(students.find(s => s.id === userId));
    else if (role === 'faculty') setCurrentUser(faculty.find(f => f.id === userId));
    else if (role === 'admin') setCurrentUser(admins.find(a => a.id === userId));
  };

  const logout = () => {
    setActiveRole(null);
    setCurrentUser(null);
    localStorage.removeItem('activeRole');
    localStorage.removeItem('currentUserId');
  };

  const value = {
    theme, toggleTheme,
    toasts, addToast,
    activeRole, currentUser, loginAs, logout,
    colleges, setColleges,
    students, setStudents,
    faculty, setFaculty,
    admins, setAdmins,
    problems, setProblems,
    contests, setContests,
    lectures, setLectures,
    submissions, setSubmissions
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
