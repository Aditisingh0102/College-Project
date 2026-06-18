import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Trophy, TrendingUp, Users } from 'lucide-react';

const topBatches = [
  { name: 'CSE-B 2024', score: 88, college: 'UIT' },
  { name: 'ECE-A 2024', score: 82, college: 'UIT' },
  { name: 'CSE-A 2023', score: 78, college: 'UIT' },
];

const participationData = [
  { month: 'Jan', students: 1200 },
  { month: 'Feb', students: 1800 },
  { month: 'Mar', students: 1600 },
  { month: 'Apr', students: 2100 },
  { month: 'May', students: 2800 },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">Cross-college comparison charts and platform health metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Performing Batches Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
            <Trophy className="w-5 h-5 mr-2 text-university-600" /> Top Performing Batches
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topBatches} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
                <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }} />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Participation Trend */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
            <TrendingUp className="w-5 h-5 mr-2 text-university-600" /> Global Contest Participation
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={participationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
          <Users className="w-5 h-5 mr-2 text-university-600" /> Most Active Engagement
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/50">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Top Faculty (Assessments)</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 dark:text-white">Dr. Sanjay Kumar</span>
              <span className="text-university-600 dark:text-university-400 font-bold">6 Contests</span>
            </div>
          </div>
          <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/50">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Top Student (Rating)</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 dark:text-white">Priya Patel</span>
              <span className="text-green-600 dark:text-green-400 font-bold">1620 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
