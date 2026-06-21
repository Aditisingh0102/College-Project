import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Mail, Phone, MapPin, Building, Shield, Key, Edit3, Users, GraduationCap, ClipboardList, CheckCircle2, XCircle, Clock, BookOpen, Award, FileText } from 'lucide-react';
import Badge from '../../components/shared/Badge';

// Mock Data
const departmentStats = [
  { label: 'Active Students', value: '1,240', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { label: 'Faculty Members', value: '45', icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
  { label: 'Ongoing Batches', value: '18', icon: ClipboardList, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' }
];

const pendingTasks = [
  { id: 1, title: 'Faculty Leave Request', desc: 'Dr. Sanjay Kumar requested 3 days leave (Medical).', time: '2 hours ago', type: 'Leave' },
  { id: 2, title: 'Approve Mid-Term Results', desc: 'Results for CSE-B 2025 uploaded by Prof. Neha.', time: '5 hours ago', type: 'Academic' },
  { id: 3, title: 'Syllabus Revision', desc: 'Review requested for Advanced Cloud Computing module.', time: '1 day ago', type: 'Curriculum' }
];

const recentActivity = [
  { id: 1, action: 'Assigned Faculty', detail: 'Allocated Dr. Vikram Singh to Data Structures (CSE-A)', date: 'Today, 10:30 AM' },
  { id: 2, action: 'Generated Report', detail: 'Downloaded Monthly Department Performance PDF', date: 'Yesterday, 4:15 PM' },
  { id: 3, action: 'Created Batch', detail: 'Initialized new batch setup for ECE-A 2024', date: '18 June 2026, 11:00 AM' }
];

export default function AdminProfile() {
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Cover & Profile Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
        <div className="h-48 bg-gradient-to-r from-gray-800 via-gray-700 to-black relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-6 gap-4">
            <div className="flex items-end space-x-5">
              <img 
                src={currentUser.photoUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-900 shadow-xl object-cover relative z-10 bg-white dark:bg-gray-800"
              />
              <div className="mb-2 hidden sm:block">
                <Badge variant="primary" className="mb-2"><Shield className="w-3 h-3 mr-1 inline-block" /> {currentUser.roleLevel}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">{currentUser.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Head of Department (Computer Science)</p>
              </div>
            </div>
            
            <button className="px-6 py-2.5 bg-gray-900 hover:bg-black dark:bg-gray-100 dark:hover:bg-white dark:text-gray-900 text-white font-medium rounded-xl transition-all sm:mb-2 shadow-sm flex items-center">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Details
            </button>
          </div>
        </div>
      </div>

      {/* Department Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departmentStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Access & Contact & Professional) */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Admin Access</h2>
            <ul className="space-y-4">
              <li className="flex items-start text-sm">
                <Key className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Role Level</p>
                  <p className="text-gray-500">{currentUser.roleLevel}</p>
                </div>
              </li>
              <li className="flex items-start text-sm">
                <Building className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Department</p>
                  <p className="text-gray-500">Computer Science & Engg.</p>
                </div>
              </li>
              <li className="flex items-start text-sm">
                <Shield className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Permissions</p>
                  <p className="text-gray-500">Full platform access, Faculty allocation, Reports generation.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact Info</h2>
            <ul className="space-y-4">
              <li className="flex items-center text-sm">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{currentUser.email || 'admin@university.edu'}</span>
              </li>
              <li className="flex items-center text-sm">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="font-medium text-gray-700 dark:text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-start text-sm">
                <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Room 401, Block A, Dept. of Computer Science</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Professional Details</h2>
            <ul className="space-y-4">
              <li className="flex items-start text-sm">
                <Award className="w-5 h-5 text-university-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Ph.D. in Artificial Intelligence</p>
                  <p className="text-gray-500">IIT Delhi (2012)</p>
                </div>
              </li>
              <li className="flex items-start text-sm">
                <BookOpen className="w-5 h-5 text-university-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">15+ IEEE Publications</p>
                  <p className="text-gray-500">Focus on Machine Learning & Neural Networks</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column (Tasks & Activity) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Pending Tasks */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-500" /> Pending Approvals
              </h2>
              <Badge variant="warning">{pendingTasks.length} Pending</Badge>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {pendingTasks.map(task => (
                <div key={task.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{task.title}</h3>
                      <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">{task.type}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{task.desc}</p>
                    <p className="text-xs text-gray-400">{task.time}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="p-2 text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-xl transition-colors" title="Approve">
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors" title="Reject">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
              <FileText className="w-5 h-5 mr-2 text-university-600" /> Recent Administrative Activity
            </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-university-100 dark:bg-university-900 text-university-600 dark:text-university-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 rounded-full bg-university-600 dark:bg-university-400"></div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{activity.action}</h4>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{activity.detail}</p>
                    <time className="text-xs font-bold text-university-500 uppercase">{activity.date}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
