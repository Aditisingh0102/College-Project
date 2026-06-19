import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, FileText, CheckCircle, Clock, BookOpen, Lock, Award, Calendar, BarChart } from 'lucide-react';

const dummyAssessments = [
  { id: 1, title: 'Module 1 Quiz', type: 'Quiz', duration: '30 mins', score: '90%', status: 'completed', date: 'Oct 15, 2023' },
  { id: 2, title: 'Mid-term Assessment', type: 'Exam', duration: '120 mins', score: '85%', status: 'completed', date: 'Nov 02, 2023' },
  { id: 3, title: 'Final Project Submission', type: 'Project', duration: 'N/A', score: '--', status: 'pending', date: 'Dec 10, 2023' },
  { id: 4, title: 'Final Certification Exam', type: 'Exam', duration: '180 mins', score: '--', status: 'locked', date: 'Dec 20, 2023' }
];

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-university-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="relative z-10">
          <button 
            onClick={() => navigate('/student/courses')}
            className="flex items-center text-sm text-gray-500 hover:text-university-600 dark:hover:text-university-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 bg-university-100 dark:bg-university-900/30 text-university-700 dark:text-university-400 text-xs font-bold rounded-lg">
                  Enrolled
                </span>
                <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" /> 12 Weeks
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Course View {id.toUpperCase()}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl text-lg">
                Master the concepts with detailed curriculum, hands-on projects, and interactive assessments.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center space-x-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Your Progress</p>
                <div className="flex items-center space-x-3">
                  <div className="w-32 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-university-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">45%</span>
                </div>
              </div>
              <button className="px-5 py-2.5 bg-university-600 hover:bg-university-700 text-white rounded-xl font-bold transition-colors shadow-sm">
                Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex space-x-8">
          {['overview', 'curriculum', 'assessments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-bold capitalize transition-colors relative ${
                activeTab === tab 
                  ? 'text-university-600 dark:text-university-400' 
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-university-600 dark:bg-university-400 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About this Course</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  This course is designed to take you from a beginner to an advanced level. You will learn the core fundamentals, participate in hands-on projects, and prepare for industry-standard assessments. 
                  By the end of this course, you will have a solid foundation and a portfolio of projects to showcase your skills.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Course Features</h3>
                <ul className="space-y-3">
                  {[
                    { icon: BookOpen, text: '24 Modules' },
                    { icon: PlayCircle, text: '120+ Video Lectures' },
                    { icon: Award, text: 'Certificate of Completion' },
                    { icon: BarChart, text: '4 Assessments' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <item.icon className="w-5 h-5 mr-3 text-university-500" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
            {[1, 2, 3, 4].map((module) => (
              <div key={module} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Module {module}: Fundamentals</h4>
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md">
                    4 Lectures • 2 Hours
                  </span>
                </div>
                <div className="space-y-3 pl-4 border-l-2 border-gray-100 dark:border-gray-800">
                  {[1, 2].map((lecture) => (
                    <div key={lecture} className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-university-600 transition-colors cursor-pointer">
                      <PlayCircle className="w-4 h-4 mr-3" />
                      <span>Lecture {module}.{lecture}: Deep Dive into Core Concepts</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Assessments</h3>
              <div className="text-sm text-gray-500">
                <span className="font-bold text-gray-900 dark:text-white">2</span> / 4 Completed
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dummyAssessments.map((assessment) => (
                <div 
                  key={assessment.id} 
                  className={`bg-white dark:bg-gray-900 border rounded-2xl p-6 transition-all ${
                    assessment.status === 'locked' 
                      ? 'border-gray-200 dark:border-gray-800 opacity-60 grayscale'
                      : assessment.status === 'completed'
                      ? 'border-green-200 dark:border-green-900/50 hover:shadow-md'
                      : 'border-university-200 dark:border-university-800 hover:shadow-md hover:border-university-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        assessment.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                        assessment.status === 'locked' ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500' :
                        'bg-university-100 text-university-600 dark:bg-university-900/30 dark:text-university-400'
                      }`}>
                        {assessment.status === 'completed' ? <CheckCircle className="w-6 h-6" /> :
                         assessment.status === 'locked' ? <Lock className="w-6 h-6" /> :
                         <FileText className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{assessment.title}</h4>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {assessment.date}</span>
                          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {assessment.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Score</span>
                      <span className={`text-lg font-black ${
                        assessment.status === 'completed' ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                      }`}>{assessment.score}</span>
                    </div>
                    
                    <button 
                      disabled={assessment.status === 'locked'}
                      className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                        assessment.status === 'completed' 
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          : assessment.status === 'locked'
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                          : 'bg-university-600 text-white hover:bg-university-700 shadow-sm'
                      }`}
                    >
                      {assessment.status === 'completed' ? 'Review' : 
                       assessment.status === 'locked' ? 'Locked' : 
                       'Start Assessment'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
