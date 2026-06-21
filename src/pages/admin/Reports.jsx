import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Trophy, TrendingUp, Users, FileDown, FileText, Download, X } from 'lucide-react';
import { useState } from 'react';

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
  const [showReportPreview, setShowReportPreview] = useState(false);
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">Cross-college comparison charts and platform health metrics.</p>
        </div>
        <button onClick={() => setShowReportPreview(true)} className="flex items-center px-5 py-2.5 bg-university-600 hover:bg-university-700 text-white rounded-xl font-medium transition-colors shadow-sm">
          <FileDown className="w-5 h-5 mr-2" /> Generate Monthly Report
        </button>
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
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Top Student</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 dark:text-white">Priya Patel</span>
              <span className="text-green-600 dark:text-green-400 font-bold">Excellent</span>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Report Preview Modal */}
      {showReportPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-university-600" />
                <h2 className="font-bold text-gray-900 dark:text-white">Preview: Department_Report_June_2026.pdf</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center px-4 py-2 bg-university-600 text-white rounded-lg text-sm font-bold hover:bg-university-700 transition">
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>
                <button onClick={() => setShowReportPreview(false)} className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto p-8 custom-scrollbar bg-gray-200 dark:bg-gray-950 flex justify-center">
              {/* A4 Paper Mock */}
              <div className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] p-12 shadow-md">
                <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
                  <h1 className="text-3xl font-black uppercase tracking-widest text-university-800">University Platform</h1>
                  <h2 className="text-xl font-bold mt-2 text-gray-700">Department Performance Report</h2>
                  <p className="text-sm text-gray-500 mt-1">Generated on: 21 June 2026</p>
                </div>
                
                <div className="space-y-8">
                  <section>
                    <h3 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-university-600 mb-4">1. Executive Summary</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">This month, the Computer Science department saw a 14% increase in overall student engagement. The platform recorded a total of 12,450 coding submissions across 6 live contests. The average class attendance stabilized at 88%.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-university-600 mb-4">2. Faculty Performance Load</h3>
                    <table className="w-full text-sm text-left border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-2 font-bold">Faculty Name</th>
                          <th className="border border-gray-300 p-2 font-bold">Target Batch</th>
                          <th className="border border-gray-300 p-2 font-bold">Lectures Uploaded</th>
                          <th className="border border-gray-300 p-2 font-bold">Student Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-gray-300 p-2">Dr. Vikram Singh</td><td className="border border-gray-300 p-2">2nd Year CSE</td><td className="border border-gray-300 p-2 text-center">45</td><td className="border border-gray-300 p-2 text-center text-green-600 font-bold">4.8 / 5.0</td></tr>
                        <tr><td className="border border-gray-300 p-2">Prof. Neha Verma</td><td className="border border-gray-300 p-2">3rd Year CSE</td><td className="border border-gray-300 p-2 text-center">32</td><td className="border border-gray-300 p-2 text-center text-green-600 font-bold">4.5 / 5.0</td></tr>
                        <tr><td className="border border-gray-300 p-2">Dr. Arvind Gupta</td><td className="border border-gray-300 p-2">4th Year AI/DS</td><td className="border border-gray-300 p-2 text-center">60</td><td className="border border-gray-300 p-2 text-center text-green-600 font-bold">4.9 / 5.0</td></tr>
                      </tbody>
                    </table>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-university-600 mb-4">3. Academic Integrity & AI Proctoring</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">The AI Plagiarism checker flagged 14 suspicious submissions during the Mid-Term Assessment. Penalties have been issued to the respective students.</p>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      <li>Total Assessments Conducted: 8</li>
                      <li>Total Clean Submissions: 3,402</li>
                      <li>Highest Similarity Detected: 92% (Code Alpha 2026)</li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
