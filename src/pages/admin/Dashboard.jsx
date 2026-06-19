import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import { Users, GraduationCap, Building2, Trophy, ArrowRight, PieChart, Briefcase, TrendingUp, Globe, FileVideo, Code2, Sparkles, AlertCircle } from 'lucide-react';
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
  
  // Sort activities by date descending
  const recentActivity = rawActivities.sort((a,b) => b.date - a.date).slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-gradient-to-r from-university-900 to-university-700 p-8 rounded-3xl shadow-lg text-white">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.name}</h1>
          <p className="text-university-100 flex items-center">
            {isVC ? <Globe className="w-5 h-5 mr-2" /> : <Building2 className="w-5 h-5 mr-2" />}
            {isVC ? "University-Wide Global Executive Dashboard" : isDean ? `${currentUser?.managedCollege} Dean Dashboard` : `${currentUser?.managedBranch} HOD Dashboard`}
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
        {!isVC && <StatCard title="Department/Branch" value={isDean ? "All Branches" : currentUser.managedBranch} icon={Building2} />}
        <StatCard title="Total Students" value={filteredStudents.length.toString()} icon={Users} trend="Live count" />
        <StatCard title="Total Faculty" value={filteredFaculty.length.toString()} icon={GraduationCap} />
        <StatCard title="Active Contests" value={filteredContests.length.toString()} icon={Trophy} trend="Running now" />
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-university-600" /> Department Performance Avg
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey="dept" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }} />
                    <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        {/* Activity Feed */}
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
  );
}
