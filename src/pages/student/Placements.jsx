import React from 'react';
import { Briefcase, Building, ChevronRight, TrendingUp, CheckCircle2, FileText, Globe } from 'lucide-react';

const companies = [
  { id: 1, name: "Google", role: "Software Engineer", ctc: "32 LPA", date: "Aug 15, 2026", type: "On-Campus", logo: "G" },
  { id: 2, name: "Microsoft", role: "SDE-1", ctc: "44 LPA", date: "Sep 02, 2026", type: "On-Campus", logo: "M" },
  { id: 3, name: "TCS Digital", role: "Systems Engineer", ctc: "7.5 LPA", date: "Sep 15, 2026", type: "Pool Campus", logo: "T" },
  { id: 4, name: "Amazon", role: "SDE Intern", ctc: "1.1L/m", date: "Oct 10, 2026", type: "Off-Campus", logo: "A" },
];

export default function Placements() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Placements & Careers</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Track campus drives, company-specific mock tests, and your applications.</p>
        </div>
        <button className="flex items-center px-6 py-3 bg-university-600 hover:bg-university-700 text-white rounded-xl font-medium transition-colors shadow-sm">
          <FileText className="w-5 h-5 mr-2" /> Upload Resume
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Upcoming Drives */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">Upcoming Drives</h2>
          
          <div className="space-y-4">
            {companies.map(company => (
              <div key={company.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                    {company.logo}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{company.name}</h3>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">{company.type}</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">{company.role}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center text-green-600 dark:text-green-400 font-bold"><TrendingUp className="w-4 h-4 mr-1"/> {company.ctc}</span>
                      <span className="flex items-center"><Globe className="w-4 h-4 mr-1"/> {company.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex md:flex-col gap-3">
                  <button className="flex-1 md:flex-none px-6 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl transition">
                    Mock Test
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-2.5 bg-university-50 text-university-700 dark:bg-university-900/20 dark:text-university-400 hover:bg-university-100 dark:hover:bg-university-900/40 font-medium rounded-xl transition border border-university-200 dark:border-university-900/30">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Stats & Prep */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-university-600 to-university-800 rounded-3xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-6 text-university-50">Your Placement Readiness</h3>
            <div className="flex items-end space-x-4 mb-6">
              <div className="text-5xl font-bold">85<span className="text-2xl text-university-300">%</span></div>
              <p className="text-university-200 pb-1">Top 15% of your batch</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-university-100">
                <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" /> Resume Score: 92/100
              </div>
              <div className="flex items-center text-sm text-university-100">
                <CheckCircle2 className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" /> DSA Rating: Advanced
              </div>
              <div className="flex items-center text-sm text-university-100 opacity-60">
                <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" /> Mock Interview (Pending)
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-university-500 transition-transform group-hover:translate-x-1" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Interview Experiences</h3>
            <p className="text-sm text-gray-500 mt-2">Read 500+ interview experiences shared by college alumni.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
