import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import { Users, GraduationCap, Building2, Trophy, ArrowRight, PieChart, Briefcase, TrendingUp, Globe } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Shared Mock Data
const recentActivity = [
  { id: 1, text: "Dr. Vikram Singh published a new Contest", time: "2 hours ago" },
  { id: 2, text: "Batch CSE-B 2024 achieved 85% average score", time: "5 hours ago" },
  { id: 3, text: "New College (Law) onboarded", time: "1 day ago" },
  { id: 4, text: "Microsoft Campus Drive scheduled", time: "2 days ago" },
];

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
  const { currentUser } = useAppContext();
  const isVC = currentUser?.roleLevel === 'VC';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-gradient-to-r from-university-900 to-university-700 p-8 rounded-3xl shadow-lg text-white">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.name}</h1>
          <p className="text-university-100 flex items-center">
            {isVC ? <Globe className="w-5 h-5 mr-2" /> : <Building2 className="w-5 h-5 mr-2" />}
            {isVC ? "University-Wide Global Executive Dashboard" : `${currentUser?.managedCollege} Dean Dashboard`}
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
        <StatCard title={isVC ? "Total Colleges" : "Total Departments"} value={isVC ? "5" : "4"} icon={Building2} trend="+1 this year" />
        <StatCard title="Total Students" value={isVC ? "12,450" : "3,200"} icon={Users} trend="+12% vs last year" />
        <StatCard title="Total Faculty" value={isVC ? "840" : "150"} icon={GraduationCap} />
        <StatCard title="Active Contests" value="24" icon={Trophy} trend="Live now" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Analytics Chart based on Role */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          {isVC ? (
            <>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-university-600" /> Global Placement Trajectory
              </h3>
              <div className="h-64">
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
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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
