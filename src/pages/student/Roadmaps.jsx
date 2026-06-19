import React, { useState } from 'react';
import { Map, MapPin, CheckCircle2, Lock, ChevronRight, PlayCircle, Trophy, X, Video, FileText, Code2 } from 'lucide-react';

const roadmaps = [
  {
    id: 1,
    title: "Software Development Engineer (SDE) Prep",
    description: "The ultimate path to crack FAANG & top product companies.",
    progress: 45,
    modules: [
      { id: 'm1', title: 'Programming Fundamentals', status: 'completed', icon: CheckCircle2, hours: '15h', desc: 'Master variables, loops, OOPs concepts in C++/Java' },
      { id: 'm2', title: 'Data Structures Foundation', status: 'completed', icon: CheckCircle2, hours: '40h', desc: 'Arrays, Strings, Linked Lists, Stacks & Queues' },
      { id: 'm3', title: 'Advanced Algorithms', status: 'completed', icon: CheckCircle2, hours: '50h', desc: 'Trees, Graphs, Dynamic Programming & Backtracking' },
      { id: 'm4', title: 'System Design Basics', status: 'in-progress', icon: PlayCircle, hours: '25h', desc: 'Scalability, Load Balancing, Microservices vs Monolith' },
      { id: 'm5', title: 'Low-Level Design (LLD)', status: 'locked', icon: Lock, hours: '20h', desc: 'Design Patterns, UML, SOLID Principles' },
      { id: 'm6', title: 'FAANG Mock Interviews', status: 'locked', icon: Lock, hours: '15h', desc: 'Live peer interviews and behavioral prep (STAR method)' },
    ]
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    description: "Master React, Node.js, and modern web architecture.",
    progress: 25,
    modules: [
      { id: 'w1', title: 'HTML, CSS & JS Core', status: 'completed', icon: CheckCircle2, hours: '20h', desc: 'Semantic HTML, Flexbox/Grid, ES6+ Javascript' },
      { id: 'w2', title: 'React Frontend Framework', status: 'in-progress', icon: PlayCircle, hours: '35h', desc: 'Hooks, State Management, Routing, Component Design' },
      { id: 'w3', title: 'Backend & APIs (Node.js)', status: 'locked', icon: Lock, hours: '40h', desc: 'Express.js, RESTful APIs, Authentication, Middleware' },
      { id: 'w4', title: 'Database & ORM', status: 'locked', icon: Lock, hours: '30h', desc: 'MongoDB, PostgreSQL, Prisma, Query Optimization' },
      { id: 'w5', title: 'DevOps & Deployment', status: 'locked', icon: Lock, hours: '15h', desc: 'Docker, CI/CD pipelines, AWS/Vercel deployment' },
      { id: 'w6', title: 'Capstone Project', status: 'locked', icon: Lock, hours: '40h', desc: 'Build and deploy a full scale production application' },
    ]
  }
];

export default function Roadmaps() {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Map className="w-8 h-8 mr-3 text-university-600" /> Visual Roadmaps
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Follow structured learning paths curated by top faculty and alumni.</p>
        </div>
        <button className="hidden sm:flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <Trophy className="w-4 h-4 mr-2 text-yellow-500" /> View Certificates
        </button>
      </div>

      <div className="space-y-12">
        {roadmaps.map(roadmap => (
          <div key={roadmap.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm relative overflow-hidden group">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-university-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-university-500/10 transition-colors duration-500"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{roadmap.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{roadmap.description}</p>
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-950 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Progress</span>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${roadmap.progress}%` }}></div>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{roadmap.progress}%</span>
              </div>
            </div>

            {/* The Path Map */}
            <div className="relative z-10 mt-10">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative mt-8">
                {roadmap.modules.map((module, i) => {
                  const Icon = module.icon;
                  const isCompleted = module.status === 'completed';
                  const isLocked = module.status === 'locked';
                  
                  return (
                    <div key={module.id} className={`flex flex-col text-left p-6 rounded-2xl transition-all relative overflow-hidden ${
                      isCompleted ? 'bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 hover:shadow-lg' :
                      isLocked ? 'bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 opacity-70 grayscale' :
                      'bg-university-50 dark:bg-university-900/20 border-2 border-university-500 shadow-lg shadow-university-500/20 transform hover:-translate-y-1'
                    }`}>
                      {/* Decorative Number */}
                      <div className={`absolute -right-4 -top-4 text-8xl font-black opacity-[0.03] ${isLocked ? 'text-gray-900' : 'text-university-900'}`}>
                        {i + 1}
                      </div>

                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                          isCompleted ? 'bg-green-500 text-white' :
                          isLocked ? 'bg-gray-200 dark:bg-gray-800 text-gray-500' :
                          'bg-university-600 text-white animate-pulse'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                           isCompleted ? 'bg-green-200 text-green-800 dark:bg-green-800/40 dark:text-green-300' :
                           isLocked ? 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400' :
                           'bg-university-200 text-university-800 dark:bg-university-800/40 dark:text-university-300'
                        }`}>
                          {module.hours || 'Module'}
                        </span>
                      </div>
                      
                      <div className="relative z-10 flex-1">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Step 0{i + 1}</p>
                        <h3 className={`font-bold text-lg mb-2 leading-tight ${isLocked ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>{module.title}</h3>
                        {module.desc && (
                          <p className={`text-sm leading-relaxed ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                            {module.desc}
                          </p>
                        )}
                      </div>
                      
                      {!isLocked && (
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800/50 relative z-10">
                          <button 
                            onClick={() => setSelectedModule(module)}
                            className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center shadow-sm ${
                            isCompleted ? 'bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/40' :
                            'bg-university-600 text-white hover:bg-university-700 hover:shadow-md'
                          }`}>
                            {isCompleted ? 'Review Material' : 'Resume Learning'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Module Dummy Content Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-950">
              <div className="flex items-center space-x-4">
                <div className="bg-university-100 dark:bg-university-900/40 p-3 rounded-xl">
                  <selectedModule.icon className="w-6 h-6 text-university-600 dark:text-university-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedModule.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedModule.hours} estimated • {selectedModule.desc || 'Module overview'}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedModule(null)}
                className="p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center">
                  <Video className="w-4 h-4 mr-2" /> Video Lectures
                </h4>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition cursor-pointer group">
                      <div className="w-10 h-10 bg-university-50 dark:bg-university-900/20 text-university-600 dark:text-university-400 rounded-lg flex items-center justify-center mr-4 group-hover:bg-university-600 group-hover:text-white transition-colors">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">Deep Dive: Topic {i} of {selectedModule.title}</p>
                        <p className="text-xs text-gray-500">45 mins • Prof. Alumni Network</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center">
                  <FileText className="w-4 h-4 mr-2" /> Reading Materials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-university-300 transition cursor-pointer">
                      <FileText className="w-5 h-5 text-blue-500 mb-2" />
                      <p className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">Cheatsheet & Notes {i}</p>
                      <p className="text-xs text-gray-500">10 min read</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center">
                  <Code2 className="w-4 h-4 mr-2" /> Practice Problems
                </h4>
                <div className="space-y-2">
                  {['Easy', 'Medium', 'Hard'].map((diff, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-black hover:shadow-sm transition cursor-pointer">
                      <div className="flex items-center">
                        <CheckCircle2 className={`w-4 h-4 mr-3 ${i === 0 ? 'text-green-500' : 'text-gray-300 dark:text-gray-700'}`} />
                        <span className="font-medium text-sm text-gray-800 dark:text-gray-200">Standard Interview Problem {i + 1}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-bold ${
                        diff === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        diff === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {diff}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
