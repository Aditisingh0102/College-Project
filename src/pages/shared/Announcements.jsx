import React, { useState } from 'react';
import { Bell, Megaphone, Plus, Search, Calendar, User, FileText } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Badge from '../../components/shared/Badge';

const initialNotices = [
  { id: 'n1', title: 'System Maintenance Scheduled', type: 'System', content: 'The platform will be down for scheduled maintenance from 2:00 AM to 4:00 AM on 25th June.', date: '21/06/2026', author: 'Admin', priority: 'High' },
  { id: 'n2', title: 'Mid-Term Grades Published', type: 'Academic', content: 'All mid-term coding assessment grades have been published. Please check your student portal.', date: '20/06/2026', author: 'Dr. Vikram Singh', priority: 'Normal' },
  { id: 'n3', title: 'New Course: Advanced AI', type: 'Course', content: 'Dr. Arvind Gupta has uploaded a new 10-module course on Advanced Artificial Intelligence.', date: '18/06/2026', author: 'Department Head', priority: 'Normal' },
  { id: 'n4', title: 'Upcoming Code Alpha Contest', type: 'Contest', content: 'Registration for Code Alpha 2026 closes tomorrow. Mandatory for all 3rd year students.', date: '15/06/2026', author: 'Prof. Neha Verma', priority: 'High' },
];

export default function Announcements() {
  const { activeRole } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredNotices = initialNotices.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center"><Megaphone className="w-8 h-8 mr-3 text-university-600" /> Notice Board</h1>
          <p className="text-gray-500 dark:text-gray-400">Official broadcasts, academic updates, and platform announcements.</p>
        </div>
        {(activeRole === 'admin' || activeRole === 'faculty') && (
          <button className="flex items-center px-5 py-2.5 bg-university-600 hover:bg-university-700 text-white rounded-xl font-medium transition-colors shadow-sm">
            <Plus className="w-5 h-5 mr-2" /> Post New Notice
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search announcements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium outline-none shadow-sm">
              <option>All Types</option>
              <option>System</option>
              <option>Academic</option>
              <option>Course</option>
              <option>Contest</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filteredNotices.map(notice => (
            <div key={notice.id} className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{notice.title}</h3>
                    {notice.priority === 'High' && <Badge variant="danger" className="animate-pulse flex items-center"><Bell className="w-3 h-3 mr-1"/> IMPORTANT</Badge>}
                    <Badge variant="primary">{notice.type}</Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{notice.content}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {notice.date}</span>
                    <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {notice.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredNotices.length === 0 && (
             <div className="p-12 text-center text-gray-500">
               <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
               <p>No announcements found.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
