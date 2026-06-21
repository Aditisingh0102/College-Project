import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { UserPlus, Edit, Trash2, X, GraduationCap, CheckCircle2, Search, Filter, BookOpen, Clock, Activity, AlertCircle, Eye, Calendar, Mail, Phone, Award } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function ManageFaculty() {
  const { currentUser, faculty } = useAppContext();
  
  // Scope faculty to HOD's department if HOD, else show all
  const isHOD = currentUser?.roleLevel === 'HOD';
  const scopedFaculty = isHOD 
    ? faculty.filter(f => f.department === currentUser.managedDepartment)
    : faculty;

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Enhanced dummy data to represent the 150+ faculty request with deep HOD access details
  const enhancedFacultyList = [
    { 
      id: "ef1", name: "Dr. Vikram Singh", designation: "Professor", branch: "Computer Science", 
      subjectsTaught: ["Data Structures", "Algorithms"], assignedBatches: ["b1", "b2"], 
      teachesYear: "2nd Year, 3rd Year", classes: "CSE-A, CSE-B", studentCount: 145, 
      photoUrl: "https://i.pravatar.cc/150?u=f1", email: "vikram.s@university.edu", phone: "+91 9876543210",
      performance: { lectures: 45, contests: 12, rating: 4.8, avgAttendance: '92%' },
      leaveRequests: [{ id: 'lr1', date: '25/06/2026', days: 2, reason: 'Conference in Delhi', status: 'Pending' }]
    },
    { 
      id: "ef2", name: "Prof. Neha Verma", designation: "Assistant Professor", branch: "Computer Science", 
      subjectsTaught: ["DBMS", "OS"], assignedBatches: ["b3"], 
      teachesYear: "3rd Year", classes: "Cyber-A", studentCount: 80, 
      photoUrl: "https://i.pravatar.cc/150?u=f2", email: "neha.v@university.edu", phone: "+91 8765432109",
      performance: { lectures: 32, contests: 5, rating: 4.5, avgAttendance: '85%' },
      leaveRequests: []
    },
    { 
      id: "ef3", name: "Dr. Arvind Gupta", designation: "Associate Professor", branch: "Computer Science", 
      subjectsTaught: ["Machine Learning", "AI"], assignedBatches: ["b4", "b5"], 
      teachesYear: "4th Year", classes: "Data Science-A, AI-B", studentCount: 110, 
      photoUrl: "https://i.pravatar.cc/150?u=f4", email: "arvind.g@university.edu", phone: "+91 7654321098",
      performance: { lectures: 60, contests: 8, rating: 4.9, avgAttendance: '95%' },
      leaveRequests: [{ id: 'lr2', date: '18/06/2026', days: 1, reason: 'Personal Work', status: 'Approved' }]
    },
    { 
      id: "ef4", name: "Mr. Rajat Kumar", designation: "Lecturer", branch: "Computer Science", 
      subjectsTaught: ["Programming in C", "Web Dev"], assignedBatches: ["b6"], 
      teachesYear: "1st Year", classes: "CSE-C", studentCount: 65, 
      photoUrl: "https://i.pravatar.cc/150?u=f5", email: "rajat.k@university.edu", phone: "+91 6543210987",
      performance: { lectures: 20, contests: 2, rating: 4.2, avgAttendance: '78%' },
      leaveRequests: []
    },
    { 
      id: "ef5", name: "Dr. Priya Sharma", designation: "Professor", branch: "Computer Science", 
      subjectsTaught: ["Cloud Computing", "Distributed Systems"], assignedBatches: [], 
      teachesYear: "M.Tech", classes: "CS-Postgrad", studentCount: 30, 
      photoUrl: "https://i.pravatar.cc/150?u=f6", email: "priya.s@university.edu", phone: "+91 5432109876",
      performance: { lectures: 15, contests: 0, rating: 4.7, avgAttendance: '88%' },
      leaveRequests: []
    },
  ];
  
  const displayFaculty = isHOD ? enhancedFacultyList.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())) : scopedFaculty;
  
  const openModal = (fac) => {
    setSelectedFaculty(fac);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFaculty(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Faculty & Staff Directory</h1>
          <p className="text-gray-500 dark:text-gray-400">Complete control over your department's faculty, their loads, and performance.</p>
        </div>
        <button className="flex items-center px-5 py-2.5 bg-university-600 hover:bg-university-700 text-white rounded-xl font-medium transition-colors shadow-sm">
          <UserPlus className="w-5 h-5 mr-2" /> Add New Faculty
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        
        {/* Search and Filters */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search faculty by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium outline-none">
              <option>All Designations</option>
              <option>Professor</option>
              <option>Associate Professor</option>
              <option>Assistant Professor</option>
              <option>Lecturer</option>
            </select>
            <select className="px-4 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium outline-none">
              <option>All Years</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Faculty Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Academic Load</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Student Capacity</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Action</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {displayFaculty.map((fac) => (
                <tr key={fac.id} onClick={() => openModal(fac)} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={fac.photoUrl} alt="" className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
                      <div>
                        <p className="text-base font-bold text-gray-900 dark:text-white group-hover:text-university-600 transition-colors">{fac.name}</p>
                        <p className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 inline-block px-2 py-0.5 rounded mt-1">{fac.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className="flex items-center text-sm font-bold text-gray-900 dark:text-white">
                        <GraduationCap className="w-4 h-4 mr-1.5 text-university-500" /> {fac.teachesYear}
                      </span>
                      <span className="text-xs text-gray-500">{fac.classes}</span>
                      <div className="flex items-center gap-1 mt-1">
                        {fac.assignedBatches.map(b => (
                          <Badge key={b} variant="primary" className="text-[10px] px-1.5">{b.toUpperCase()}</Badge>
                        ))}
                        {fac.assignedBatches.length === 0 && <span className="text-xs text-gray-400 italic">No batches</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-gray-900 dark:text-white">{fac.studentCount}</span>
                      <span className="text-xs text-gray-500">Total Students</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {fac.leaveRequests?.some(r => r.status === 'Pending') ? (
                      <div className="flex items-center text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-lg border border-orange-100 dark:border-orange-800/30 w-fit">
                        <AlertCircle className="w-4 h-4 mr-1.5" />
                        <span className="text-xs font-bold">Leave Pending</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={(e) => { e.stopPropagation(); openModal(fac); }} className="px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-university-50 hover:text-university-600 hover:border-university-200 transition-colors">
                      View HOD Panel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Super Detailed HOD Modal for Faculty */}
      {isModalOpen && selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center space-x-4">
                <img src={selectedFaculty.photoUrl} alt="" className="w-14 h-14 rounded-full border-2 border-white dark:border-gray-800 shadow-md" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {selectedFaculty.name} <Badge variant="primary" className="text-xs">{selectedFaculty.designation}</Badge>
                  </h2>
                  <p className="text-sm text-gray-500">{selectedFaculty.branch} Department</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition" title="Edit Faculty Details">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition" title="Remove Faculty">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="w-px h-8 bg-gray-300 mx-2 self-center"></div>
                <button onClick={closeModal} className="p-2 text-gray-500 hover:bg-gray-200 rounded-xl transition">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar bg-white dark:bg-gray-950">
              
              {/* Contact & Basics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Email Address</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedFaculty.email}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Phone Number</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedFaculty.phone}</p>
                  </div>
                </div>
              </div>

              {/* Workload Profile */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-university-600" /> Academic Workload Profile
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-2xl">
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">Target Audience</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">{selectedFaculty.teachesYear}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedFaculty.classes}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 p-4 rounded-2xl">
                    <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase mb-1">Subjects Taught</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedFaculty.subjectsTaught.map(s => <Badge key={s} variant="primary" className="text-[10px]">{s}</Badge>)}
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 p-4 rounded-2xl">
                    <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase mb-1">Total Student Load</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{selectedFaculty.studentCount}</p>
                    <p className="text-xs text-gray-500 mt-1">Across {selectedFaculty.assignedBatches.length} Batches</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-university-600" /> Key Performance Indicators (KPI)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-2xl text-center">
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{selectedFaculty.performance?.lectures}</p>
                    <p className="text-xs font-bold text-gray-500 uppercase mt-1">Lectures Uploaded</p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-2xl text-center">
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{selectedFaculty.performance?.contests}</p>
                    <p className="text-xs font-bold text-gray-500 uppercase mt-1">Contests Created</p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-2xl text-center bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/30">
                    <p className="text-2xl font-black text-yellow-600 dark:text-yellow-500 flex items-center justify-center">
                      {selectedFaculty.performance?.rating} <span className="text-sm ml-1 text-yellow-600/70">/ 5.0</span>
                    </p>
                    <p className="text-xs font-bold text-yellow-700 dark:text-yellow-600 uppercase mt-1">Student Feedback</p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-2xl text-center">
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{selectedFaculty.performance?.avgAttendance}</p>
                    <p className="text-xs font-bold text-gray-500 uppercase mt-1">Class Attendance</p>
                  </div>
                </div>
              </div>

              {/* Leave Requests & Approvals */}
              {selectedFaculty.leaveRequests && selectedFaculty.leaveRequests.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-university-600" /> Leave Management
                  </h3>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                    {selectedFaculty.leaveRequests.map(req => (
                      <div key={req.id} className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 last:border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900 dark:text-white">{req.date}</span>
                            <Badge variant={req.status === 'Pending' ? 'warning' : 'success'}>{req.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{req.reason} • {req.days} Day(s)</p>
                        </div>
                        {req.status === 'Pending' && (
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold transition">Reject</button>
                            <button className="px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-xl text-sm font-bold transition">Approve</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
