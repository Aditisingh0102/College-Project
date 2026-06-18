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

  // Role and User state
  const [activeRole, setActiveRole] = useState(null); // 'student', 'faculty', 'admin', or null
  const [currentUser, setCurrentUser] = useState(null);

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
    if (role === 'student') setCurrentUser(students.find(s => s.id === userId));
    else if (role === 'faculty') setCurrentUser(faculty.find(f => f.id === userId));
    else if (role === 'admin') setCurrentUser(admins.find(a => a.id === userId));
  };

  const logout = () => {
    setActiveRole(null);
    setCurrentUser(null);
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
