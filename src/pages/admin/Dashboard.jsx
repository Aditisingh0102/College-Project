import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import Badge from '../../components/shared/Badge';
import { Users, GraduationCap, Building2, Trophy, ArrowRight, PieChart, Briefcase, TrendingUp, Globe, FileVideo, Code2, Sparkles, AlertCircle, PlusCircle, ClipboardList, UserPlus, CheckCircle, XCircle, X, ChevronDown, ChevronRight, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// VC Specific Mock Data
const placementTrend = [
  { year: '2022', placed: 850 }, { year: '2023', placed: 1100 },
  { year: '2024', placed: 1450 }, { year: '2025', placed: 1800 },
];
const budgetAllocation = [
  { college: 'UIT', budget: 45 }, { college: 'USCS', budget: 30 },
  { college: 'MBA', budget: 15 }, { college: 'Law', budget: 10 },
];

// Dean Specific Mock Data
const deptPerformance = [
  { dept: 'CSE', score: 88 }, { dept: 'ECE', score: 76 },
  { dept: 'MECH', score: 65 }, { dept: 'CIVIL', score: 70 },
];

const yearPerformance = [
  { year: '1st Year', score: 82 }, { year: '2nd Year', score: 78 },
  { year: '3rd Year', score: 85 }, { year: '4th Year', score: 91 },
];

export default function Dashboard() {
  const { currentUser, colleges, students, faculty, contests, lectures } = useAppContext();
  const isVC = currentUser?.roleLevel === 'VC';
  const isDean = currentUser?.roleLevel === 'Dean';
  const isHOD = currentUser?.roleLevel === 'HOD';

  // Dynamic Filtering Based on Role
  const filteredStudents = isVC ? students : students.filter(s => s.college === currentUser.managedCollege && (isHOD ? s.branch === currentUser.managedBranch : true));
  const filteredFaculty = isVC ? faculty : faculty.filter(f => f.college === currentUser.managedCollege && (isHOD ? f.branch === currentUser.managedBranch : true));
  const filteredContests = isVC ? contests : contests.filter(c => c.college === currentUser.managedCollege && (isHOD ? c.branch === currentUser.managedBranch : true));
  const filteredLectures = isVC ? lectures : lectures.filter(l => l.college === currentUser.managedCollege && (isHOD ? l.branch === currentUser.managedBranch : true));

  // Build Dynamic Activity Feed
  const rawActivities = [
    ...filteredContests.map(c => ({ id: `c-${c.id}`, type: 'contest', text: `${c.facultyName} published a new Contest: ${c.title}`, date: c.id > 10 ? new Date() : new Date(Date.now() - 7200000) })), // if mock id > 10 it's newly created
    ...filteredLectures.map(l => ({ id: `l-${l.id}`, type: 'lecture', text: `${l.facultyName} uploaded a new Lecture: ${l.title}`, date: l.id > 10 ? new Date() : new Date(Date.now() - 86400000) }))
  ];
  
  // Add robust dummy activities for HOD to populate the feed
  if (isHOD) {
    rawActivities.push(
      { id: 'hd-1', type: 'lecture', text: 'Prof. Arvind Gupta published a new Machine Learning assignment.', date: new Date(Date.now() - 3600000) },
      { id: 'hd-2', type: 'contest', text: 'Department-wide "Code Alpha" Contest started.', date: new Date(Date.now() - 5400000) },
      { id: 'hd-3', type: 'lecture', text: 'Dr. Vikram Singh uploaded 3 new video lectures for Data Structures.', date: new Date(Date.now() - 10800000) },
      { id: 'hd-4', type: 'lecture', text: 'Batch B2 attendance updated by Prof. Neha Verma.', date: new Date(Date.now() - 14400000) }
    );
  }

  // Sort activities by date descending
  const recentActivity = rawActivities.sort((a,b) => b.date - a.date).slice(0, 6);

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [isContestModalOpen, setIsContestModalOpen] = useState(false);
  
  // Drill-down Modal State
  const [expandedYears, setExpandedYears] = useState({});
  const [expandedDesignations, setExpandedDesignations] = useState({});
  const [expandedFaculty, setExpandedFaculty] = useState({});
  const [expandedContestCategory, setExpandedContestCategory] = useState({ active: true, upcoming: true });

  const toggleYear = (year) => setExpandedYears(prev => ({...prev, [year]: !prev[year]}));
  const toggleDesignation = (desig) => setExpandedDesignations(prev => ({...prev, [desig]: !prev[desig]}));
  const toggleFaculty = (facId) => setExpandedFaculty(prev => ({...prev, [facId]: !prev[facId]}));
  const toggleContestCategory = (cat) => setExpandedContestCategory(prev => ({...prev, [cat]: !prev[cat]}));

  const pendingApprovals = [
    { id: 1, type: 'batch_shift', text: 'Prof. Neha Verma requests to shift 5 students to Batch Beta.', time: '2 hours ago' },
    { id: 2, type: 'faculty_leave', text: 'Dr. Vikram Singh requested leave for 2 days.', time: '5 hours ago' },
    { id: 3, type: 'new_student', text: 'New student registration pending department approval.', time: '1 day ago' },
  ];



  if (isStudentModalOpen) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between p-8 bg-gradient-to-r from-university-900 to-university-700 rounded-3xl shadow-lg text-white mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Department Students Breakdown</h1>
            <p className="text-university-100 flex items-center">Total: 4,520 Students</p>
          </div>
          <button onClick={() => setIsStudentModalOpen(false)} className="flex items-center px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition font-medium backdrop-blur-sm"><ArrowRight className="w-5 h-5 mr-2 rotate-180" /> Back to Dashboard</button>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl space-y-4 shadow-sm">
          {/* Year 1 */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button onClick={() => toggleYear('y1')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <div className="flex items-center font-bold text-gray-900 dark:text-white">
                {expandedYears['y1'] ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                1st Year
              </div>
              <Badge variant="primary">1,200 Students</Badge>
            </button>
            {expandedYears['y1'] && (
              <div className="p-4 bg-white dark:bg-gray-900 space-y-3">
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Computer Science (CSE)</span><span className="font-bold text-gray-900 dark:text-white">400</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Mechanical</span><span className="font-bold text-gray-900 dark:text-white">250</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Cyber Security</span><span className="font-bold text-gray-900 dark:text-white">150</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Civil</span><span className="font-bold text-gray-900 dark:text-white">200</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Data Science</span><span className="font-bold text-gray-900 dark:text-white">200</span></div>
              </div>
            )}
          </div>
          {/* Year 2 */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button onClick={() => toggleYear('y2')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <div className="flex items-center font-bold text-gray-900 dark:text-white">
                {expandedYears['y2'] ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                2nd Year
              </div>
              <Badge variant="primary">1,100 Students</Badge>
            </button>
            {expandedYears['y2'] && (
              <div className="p-4 bg-white dark:bg-gray-900 space-y-3">
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Computer Science (CSE)</span><span className="font-bold text-gray-900 dark:text-white">350</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Mechanical</span><span className="font-bold text-gray-900 dark:text-white">200</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Cyber Security</span><span className="font-bold text-gray-900 dark:text-white">250</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Civil</span><span className="font-bold text-gray-900 dark:text-white">150</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Data Science</span><span className="font-bold text-gray-900 dark:text-white">150</span></div>
              </div>
            )}
          </div>
          {/* Year 3 */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button onClick={() => toggleYear('y3')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <div className="flex items-center font-bold text-gray-900 dark:text-white">
                {expandedYears['y3'] ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                3rd Year
              </div>
              <Badge variant="primary">1,150 Students</Badge>
            </button>
            {expandedYears['y3'] && (
              <div className="p-4 bg-white dark:bg-gray-900 space-y-3">
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Computer Science (CSE)</span><span className="font-bold text-gray-900 dark:text-white">400</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Mechanical</span><span className="font-bold text-gray-900 dark:text-white">200</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Cyber Security</span><span className="font-bold text-gray-900 dark:text-white">300</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Civil</span><span className="font-bold text-gray-900 dark:text-white">150</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Data Science</span><span className="font-bold text-gray-900 dark:text-white">100</span></div>
              </div>
            )}
          </div>
          {/* Year 4 */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button onClick={() => toggleYear('y4')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <div className="flex items-center font-bold text-gray-900 dark:text-white">
                {expandedYears['y4'] ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                4th Year
              </div>
              <Badge variant="primary">1,070 Students</Badge>
            </button>
            {expandedYears['y4'] && (
              <div className="p-4 bg-white dark:bg-gray-900 space-y-3">
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Computer Science (CSE)</span><span className="font-bold text-gray-900 dark:text-white">380</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Mechanical</span><span className="font-bold text-gray-900 dark:text-white">180</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Cyber Security</span><span className="font-bold text-gray-900 dark:text-white">240</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Civil</span><span className="font-bold text-gray-900 dark:text-white">140</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-gray-600 dark:text-gray-400">Data Science</span><span className="font-bold text-gray-900 dark:text-white">130</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isFacultyModalOpen) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between p-8 bg-gradient-to-r from-university-900 to-university-700 rounded-3xl shadow-lg text-white mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Department Faculty Directory</h1>
            <p className="text-university-100 flex items-center">Total: 156 Faculty Members</p>
          </div>
          <button onClick={() => setIsFacultyModalOpen(false)} className="flex items-center px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition font-medium backdrop-blur-sm"><ArrowRight className="w-5 h-5 mr-2 rotate-180" /> Back to Dashboard</button>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl space-y-4 shadow-sm">
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button onClick={() => toggleDesignation('d1')} className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
              <div className="flex items-center font-bold text-blue-900 dark:text-blue-100">
                {expandedDesignations['d1'] ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                Assistant Professors
              </div>
              <Badge variant="primary">91 Members</Badge>
            </button>
            {expandedDesignations['d1'] && (
              <div className="p-4 bg-white dark:bg-gray-900 space-y-4">
                <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaculty('f1')}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">Prof. Neha Verma</p>
                        <p className="text-xs text-gray-500">Database Management Systems</p>
                      </div>
                    </div>
                    {expandedFaculty['f1'] ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  </div>
                  {expandedFaculty['f1'] && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4 text-sm">
                      <div><p className="text-gray-500 mb-1">Teaches</p><p className="font-medium text-gray-900 dark:text-white">2nd Year (CSE-A, CSE-B)</p></div>
                      <div><p className="text-gray-500 mb-1">Total Students</p><p className="font-medium text-gray-900 dark:text-white">125 Students</p></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button onClick={() => toggleDesignation('d2')} className="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition">
              <div className="flex items-center font-bold text-purple-900 dark:text-purple-100">
                {expandedDesignations['d2'] ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                Associate Professors
              </div>
              <Badge variant="primary">45 Members</Badge>
            </button>
            {expandedDesignations['d2'] && (
              <div className="p-4 bg-white dark:bg-gray-900 space-y-4">
                <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaculty('f3')}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">Dr. Arvind Gupta</p>
                        <p className="text-xs text-gray-500">Machine Learning, AI</p>
                      </div>
                    </div>
                    {expandedFaculty['f3'] ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  </div>
                  {expandedFaculty['f3'] && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4 text-sm">
                      <div><p className="text-gray-500 mb-1">Teaches</p><p className="font-medium text-gray-900 dark:text-white">4th Year (Data Science-A)</p></div>
                      <div><p className="text-gray-500 mb-1">Total Students</p><p className="font-medium text-gray-900 dark:text-white">110 Students</p></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isContestModalOpen) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between p-8 bg-gradient-to-r from-university-900 to-university-700 rounded-3xl shadow-lg text-white mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Department Contests Overview</h1>
            <p className="text-university-100 flex items-center">14 Active • 8 Upcoming Scheduled</p>
          </div>
          <button onClick={() => setIsContestModalOpen(false)} className="flex items-center px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition font-medium backdrop-blur-sm"><ArrowRight className="w-5 h-5 mr-2 rotate-180" /> Back to Dashboard</button>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl space-y-4 shadow-sm">
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button onClick={() => toggleContestCategory('active')} className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition">
              <div className="flex items-center font-bold text-green-900 dark:text-green-100">
                {expandedContestCategory['active'] ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                Currently Running Contests
              </div>
              <Badge variant="primary" className="bg-green-100 text-green-800">14 Live</Badge>
            </button>
            {expandedContestCategory['active'] && (
              <div className="p-4 bg-white dark:bg-gray-900 space-y-3">
                <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Data Structures Mid-Term Sprint</h4>
                      <p className="text-sm text-gray-500">Assigned by: Dr. Vikram Singh</p>
                    </div>
                    <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Live</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-gradient-to-r from-university-900 to-university-700 p-8 rounded-3xl shadow-lg text-white">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.name}</h1>
          <p className="text-university-100 flex items-center">
            {isVC ? <Globe className="w-5 h-5 mr-2" /> : <Building2 className="w-5 h-5 mr-2" />}
            {isVC ? "University-Wide Global Executive Dashboard" : isDean ? `${currentUser?.managedCollege} Dean Dashboard` : `${currentUser?.managedDepartment || currentUser?.managedBranch} HOD Dashboard`}
          </p>
        </div>
        <div className="hidden md:block">
          <div className="bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20 text-center">
            <p className="text-xs uppercase tracking-wider text-university-200 font-bold mb-1">Access Level</p>
            <p className="font-mono text-xl">{currentUser?.roleLevel}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isVC && <StatCard title="Total Colleges" value={colleges.length.toString()} icon={Building2} trend="Active" />}
        {!isVC && <StatCard title="Department/Branch" value={isDean ? "All Branches" : (currentUser.managedDepartment || currentUser.managedBranch)} icon={Building2} />}
        <StatCard 
          title="Total Students" 
          value={isHOD ? "4,520" : filteredStudents.length.toString()} 
          icon={Users} 
          onClick={isHOD ? () => setIsStudentModalOpen(true) : undefined}
          trend={isHOD ? "Click for details ➔" : ""}
          trendColor="text-university-500"
        />
        <StatCard 
          title="Total Faculty" 
          value={isHOD ? "156" : filteredFaculty.length.toString()} 
          icon={GraduationCap} 
          onClick={isHOD ? () => setIsFacultyModalOpen(true) : undefined}
          trend={isHOD ? "Click for details ➔" : ""}
          trendColor="text-university-500"
        />
        <StatCard 
          title="Active Contests" 
          value={isHOD ? "14" : filteredContests.length.toString()} 
          icon={Trophy} 
          trend={isHOD ? "Click for details ➔" : "Running now"}
          trendColor="text-university-500"
          onClick={isHOD ? () => setIsContestModalOpen(true) : undefined}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Analytics Chart based on Role */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          {isVC ? (
            <>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-university-600" /> Global Placement Trajectory
              </h3>
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={placementTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey="year" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="placed" stroke="#10b981" strokeWidth={4} dot={{r: 5}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {isHOD && (
                <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" /> Department Star Performers
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/10 border border-yellow-100 dark:border-yellow-800/30 rounded-2xl">
                      <img src="https://i.pravatar.cc/150?u=st2" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Student" />
                      <div className="ml-3">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Priya Patel</p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-500 font-medium">Top Student</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl">
                      <img src="https://i.pravatar.cc/150?u=f1" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Faculty" />
                      <div className="ml-3">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Dr. Vikram Singh</p>
                        <p className="text-xs text-blue-700 dark:text-blue-500 font-medium">Most Active Faculty</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* AI Predictive Budgeting Widget */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-900/20 border-2 border-indigo-100 dark:border-indigo-800/50 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Sparkles className="w-24 h-24 text-indigo-500" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-indigo-800 dark:text-indigo-300 font-bold flex items-center mb-3">
                    <Sparkles className="w-5 h-5 mr-2" /> AI Predictive Budget Allocation
                  </h4>
                  <div className="bg-white/60 dark:bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/50 text-sm text-gray-800 dark:text-gray-300 space-y-3">
                    <p><strong>Analysis:</strong> The Computer Science department shows 85% engagement in coding contests, while Civil Engineering engagement is at 20%.</p>
                    <div className="flex items-start bg-indigo-100/50 dark:bg-indigo-900/40 p-3 rounded-lg border border-indigo-200 dark:border-indigo-700/50">
                      <AlertCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 shrink-0 mt-0.5" />
                      <p className="font-medium text-indigo-900 dark:text-indigo-200">Recommendation: Shift 5% of the Civil lab equipment budget ($45,000) to the CS Cloud-Hosting fund to proactively support scaling server infrastructure for high student engagement.</p>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-xs shadow-md transition">
                        Approve Budget Reallocation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {isHOD && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-university-600" /> HOD Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl hover:bg-blue-100 hover:shadow-md transition-all group">
                      <ClipboardList className="w-5 h-5 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-blue-800 dark:text-blue-300">Schedule Meeting</span>
                    </button>
                    <button className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl hover:bg-green-100 hover:shadow-md transition-all group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-green-800 dark:text-green-300">Review Tests</span>
                    </button>
                    <button className="flex items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-2xl hover:bg-purple-100 hover:shadow-md transition-all group">
                      <GraduationCap className="w-5 h-5 text-purple-600 mr-2 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-purple-800 dark:text-purple-300">Manage Faculty</span>
                    </button>
                  </div>
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-university-600" /> {isHOD ? 'Year-wise Performance Avg' : 'Department Performance Avg'}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={isHOD ? yearPerformance : deptPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey={isHOD ? "year" : "dept"} stroke="#6b7280" />
                    <YAxis stroke="#6b7280" domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }} />
                    <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        {/* Activity Feed and Approvals */}
        <div className="space-y-6">
          {isHOD && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-500" /> Pending Approvals
              </h3>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="p-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/50 rounded-xl">
                    <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">{approval.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{approval.time}</span>
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:bg-green-100 p-1 rounded transition-colors" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                        <button className="text-red-600 hover:bg-red-100 p-1 rounded transition-colors" title="Reject"><XCircle className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">System Activity</h3>
            <div className="space-y-6 flex-1">
              {recentActivity.map((activity, i) => (
                <div key={activity.id} className="flex relative">
                  {i !== recentActivity.length - 1 && <div className="absolute top-8 bottom-0 left-2 w-0.5 bg-gray-100 dark:bg-gray-800"></div>}
                  <div className="w-4 h-4 mt-1 rounded-full bg-university-100 dark:bg-university-900 border-2 border-university-500 z-10 shrink-0"></div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      {activity.type === 'contest' ? <Code2 className="w-4 h-4 mr-2 text-university-500" /> : <FileVideo className="w-4 h-4 mr-2 text-university-500" />}
                      {activity.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date.toLocaleDateString()} {activity.date.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-university-600 font-medium hover:bg-university-50 dark:hover:bg-university-900/20 rounded-xl transition">
              View All Logs
            </button>
          </div>
        </div>
        
      </div>

    </div>
  );
}
