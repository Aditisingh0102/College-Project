import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import Badge from '../../components/shared/Badge';
import { Users, BookOpen, FileEdit, Calendar, AlertCircle, CheckCircle2, ChevronRight, PlayCircle, CheckSquare, Square, Plus, Trash2, Edit2, X, Check, UploadCloud, Megaphone, Clock, MapPin, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser } = useAppContext();
  
  const [notes, setNotes] = useState([
    { id: 1, text: 'Upload Week 4 DSA Lecture before Friday', completed: false },
    { id: 2, text: 'Grade Mid-term assignments for Beta batch', completed: false },
    { id: 3, text: 'Schedule doubt clearing session for M.Tech AI', completed: false },
    { id: 4, text: 'Review new syllabus proposals', completed: true },
  ]);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  if (!currentUser) return null;

  const activeBatches = [
    { id: 1, name: 'B.Tech CSE 2026 Alpha', students: 65, nextClass: 'Tomorrow, 10:00 AM', subject: 'Data Structures' },
    { id: 2, name: 'B.Tech CSE 2026 Beta', students: 62, nextClass: 'Today, 2:00 PM', subject: 'Data Structures' },
    { id: 3, name: 'M.Tech AI 2024', students: 28, nextClass: 'Thursday, 11:30 AM', subject: 'Machine Learning' },
    { id: 4, name: 'B.Tech IT 2025 Gamma', students: 55, nextClass: 'Friday, 09:00 AM', subject: 'Operating Systems' },
  ];

  const actionItems = [
    { id: 1, text: '3 Unapproved submissions in DSA Assignment', type: 'urgent', time: '2 hours ago' },
    { id: 2, text: 'Upcoming Quiz: Graph Theory tomorrow', type: 'warning', time: '5 hours ago' },
    { id: 3, text: 'Upload Week 4 Lecture Notes', type: 'info', time: '1 day ago' },
  ];

  const todaySchedule = [
    { id: 1, time: '09:00 AM', title: 'Data Structures (Alpha)', location: 'Room 304', type: 'class' },
    { id: 2, time: '11:30 AM', title: 'Department Meeting', location: 'Conference Hall', type: 'meeting' },
    { id: 3, time: '02:00 PM', title: 'Office Hours', location: 'Cabin 42', type: 'office' },
  ];

  const toggleNote = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, completed: !n.completed } : n));
  };

  const startEdit = (id, text, e) => {
    e.stopPropagation();
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id, e) => {
    if (e) e.stopPropagation();
    if (editingText.trim()) {
      setNotes(notes.map(n => n.id === id ? { ...n, text: editingText.trim() } : n));
    }
    setEditingId(null);
  };

  const cancelEdit = (e) => {
    if (e) e.stopPropagation();
    setEditingId(null);
  };

  const deleteNote = (id, e) => {
    e.stopPropagation();
    setNotes(notes.filter(n => n.id !== id));
  };

  const addNote = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (newNote.trim()) {
        setNotes([...notes, { id: Date.now(), text: newNote.trim(), completed: false }]);
        setNewNote('');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      
      {/* Teaching Tracker Banner */}
      <div className="bg-gradient-to-br from-university-700 via-university-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-6">
            <img src={currentUser.photoUrl} alt="Avatar" className="w-20 h-20 rounded-2xl border-2 border-white/20 shadow-lg object-cover" />
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-university-50">Faculty Portal</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight mb-1">Welcome, Prof. {currentUser.name.replace('Dr. ', '').replace('Prof. ', '').split(' ')[0]}</h1>
              <p className="text-university-100 font-medium opacity-90">{currentUser.designation} • Dept of {currentUser.department}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="155" icon={Users} colorClass="text-blue-600 bg-blue-100 dark:bg-blue-900/30" />
        <StatCard title="Active Batches" value="3" icon={BookOpen} colorClass="text-university-600 bg-university-100 dark:bg-university-900/30" />
        <StatCard title="Lectures Uploaded" value="12" icon={PlayCircle} colorClass="text-purple-600 bg-purple-100 dark:bg-purple-900/30" />
        <StatCard title="Pending Grading" value="45" icon={FileEdit} colorClass="text-orange-500 bg-orange-100 dark:bg-orange-900/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Batches & Action Items */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Batches Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Batches</h2>
              <Link to="/faculty/batches" className="text-sm text-university-600 dark:text-university-400 hover:underline font-medium">View All Batches</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeBatches.map(batch => (
                <Link to="/faculty/batches" key={batch.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md hover:border-university-300 dark:hover:border-university-700 transition-all group block cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-university-50 dark:bg-university-900/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6 text-university-600 dark:text-university-400" />
                    </div>
                    <Badge variant="success">{batch.students} Students</Badge>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 group-hover:text-university-600 transition-colors">{batch.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{batch.subject}</p>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <Calendar className="w-4 h-4 mr-1.5" /> {batch.nextClass}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-university-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Items / Pending Tasks */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Action Items</h2>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-3">
              {actionItems.map(item => (
                <Link to="/faculty/action-items" key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-colors group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2.5 rounded-xl group-hover:scale-110 transition-transform ${
                      item.type === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 
                      item.type === 'warning' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                       <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-university-600 transition-colors">{item.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-university-600 dark:text-university-400 group-hover:text-university-700 dark:group-hover:text-university-300">
                    Review
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Quick Actions, Schedule, Notebook */}
        <div className="lg:col-span-1 space-y-8 flex flex-col">
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/faculty/assessment" className="flex flex-col items-center justify-center p-3 rounded-2xl bg-university-50 hover:bg-university-100 dark:bg-university-900/20 dark:hover:bg-university-900/40 border border-university-100 dark:border-university-800 transition-colors group shadow-sm cursor-pointer">
                <Plus className="w-6 h-6 text-university-600 dark:text-university-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Assessment</span>
              </Link>
              <Link to="/faculty/lectures" className="flex flex-col items-center justify-center p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 border border-purple-100 dark:border-purple-800 transition-colors group shadow-sm cursor-pointer">
                <UploadCloud className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Lecture</span>
              </Link>
              <Link to="/faculty/announcements" className="flex flex-col items-center justify-center p-3 rounded-2xl bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 border border-orange-100 dark:border-orange-800 transition-colors group shadow-sm cursor-pointer">
                <Megaphone className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Announce</span>
              </Link>
              <Link to="/faculty/grades" className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-blue-800 transition-colors group shadow-sm cursor-pointer">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Grades</span>
              </Link>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Schedule</h2>
              <button className="text-sm text-university-600 hover:underline font-medium">Calendar</button>
            </div>
            <div className="space-y-0 relative border-l-2 border-gray-100 dark:border-gray-800 ml-3">
              {todaySchedule.map((item, index) => (
                <Link to="/faculty/schedule" key={item.id} className="relative pl-6 pb-6 last:pb-0 group block cursor-pointer">
                  <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 border-university-500 group-hover:scale-125 group-hover:bg-university-500 transition-all"></div>
                  <span className="text-xs font-bold text-university-600 dark:text-university-400">{item.time}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mt-0.5 group-hover:text-university-600 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" /> {item.location}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Notebook / Quick Notes */}
          <div className="flex-1 space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <FileEdit className="w-5 h-5 mr-2 text-university-600 dark:text-university-400" />
                Quick Notes
              </h2>
            </div>
          
          <div className="flex-1 bg-[#fffdf0] dark:bg-gray-900 border border-yellow-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col min-h-[300px]">
            {/* Notebook styling elements */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-red-200 dark:bg-red-900/30"></div>
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-200 dark:bg-red-900/30"></div>
            
            {/* Header/Date area */}
            <div className="pl-6 mb-4 flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">My Notebook</span>
              <span className="text-xs text-gray-400 font-mono">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="flex-1 space-y-4 pl-6 overflow-y-auto pr-2 custom-scrollbar">
              {notes.map(note => (
                <div 
                  key={note.id} 
                  onClick={() => !editingId && toggleNote(note.id)}
                  className="flex items-start gap-3 cursor-pointer group relative"
                >
                  <div className="absolute -inset-x-2 -inset-y-1 rounded-lg hover:bg-yellow-100/50 dark:hover:bg-gray-800/50 transition-colors pointer-events-none"></div>
                  
                  <div className="mt-0.5 text-university-600 dark:text-university-500 relative z-10">
                    {note.completed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                  </div>

                  {editingId === note.id ? (
                    <div className="flex-1 flex items-center gap-2 relative z-10 pr-2" onClick={e => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(note.id, e); if (e.key === 'Escape') cancelEdit(e); }}
                        className="flex-1 bg-white dark:bg-gray-950 border border-university-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-university-400 shadow-sm"
                        autoFocus
                      />
                      <button onClick={(e) => saveEdit(note.id, e)} className="text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 p-1.5 rounded-md transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={cancelEdit} className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-md transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-start justify-between relative z-10 group/item">
                      <p className={`text-sm leading-relaxed pr-2 pt-0.5 ${note.completed ? 'text-gray-400 dark:text-gray-600 line-through' : 'text-gray-800 dark:text-gray-300'}`}>
                        {note.text}
                      </p>
                      
                      {/* Action buttons - appear on hover */}
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent pl-2">
                        <button 
                          onClick={(e) => startEdit(note.id, note.text, e)}
                          className="p-1.5 text-gray-400 hover:text-university-600 hover:bg-university-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => deleteNote(note.id, e)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {notes.length === 0 && (
                <div className="text-center text-sm text-gray-400 italic pt-10">
                  Your notebook is empty.
                </div>
              )}
            </div>
            
            <div className="mt-4 pl-6 relative">
              <input 
                type="text" 
                placeholder="Write a new note..." 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={addNote}
                className="w-full bg-white dark:bg-gray-950 border border-yellow-300 dark:border-gray-700 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-university-400 dark:text-white transition-all shadow-sm"
              />
              <button 
                onClick={addNote} 
                className="absolute right-2 top-2 p-1.5 text-university-600 dark:text-university-500 hover:bg-university-50 dark:hover:bg-university-900/30 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}
