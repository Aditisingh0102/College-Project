import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, BookOpen, ArrowRight, PlayCircle, Code2, Database, Layout, PenTool, MonitorPlay } from 'lucide-react';

const courseCategories = [
  { id: 'web', label: 'Web Frameworks', icon: Layout },
  { id: 'data', label: 'Data Analytics & Data Science', icon: Database },
  { id: 'cloud', label: 'Cloud Computing', icon: Code2 },
  { id: 'system', label: 'System Design', icon: PenTool },
  { id: 'ai', label: 'Generative AI', icon: MonitorPlay },
];

const enrolledCourses = [
  {
    id: 'e1',
    title: 'Complete SDE Preparation Program',
    offerEnds: 'Offer ends in 2 days',
    rating: 4.8,
    level: 'Beginner to Advanced',
    price: '10,999',
    oldPrice: '14,000',
    imageGradient: 'bg-gradient-to-br from-teal-500 to-blue-600',
    progress: 45,
  },
  {
    id: 'e2',
    title: 'Data Analytics Bootcamp',
    offerEnds: 'Offer ends in 3 days',
    rating: 4.7,
    level: 'Beginner to Advanced',
    price: '12,999',
    oldPrice: '16,000',
    imageGradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    progress: 12,
  }
];

const liveCourses = [
  {
    id: 'l1',
    title: 'Java Backend Development (Live)',
    offerEnds: 'Offer ends in 5 days',
    rating: 4.9,
    level: 'Intermediate to Advanced',
    price: '9,999',
    oldPrice: '15,000',
    imageGradient: 'bg-gradient-to-br from-blue-600 to-indigo-800',
  },
  {
    id: 'l2',
    title: 'System Design (Live)',
    offerEnds: 'Offer ends in 1 day',
    rating: 4.8,
    level: 'Advanced',
    price: '14,000',
    oldPrice: '18,000',
    imageGradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
  },
  {
    id: 'l3',
    title: 'Generative AI Masterclass',
    offerEnds: 'Offer ends in 4 days',
    rating: 4.9,
    level: 'Intermediate',
    price: '19,999',
    oldPrice: '25,000',
    imageGradient: 'bg-gradient-to-br from-purple-500 to-violet-700',
  }
];

const selfPacedCourses = [
  {
    id: 's1',
    title: 'Data Structures & Algorithms',
    offerEnds: 'Offer ends in 2 days',
    rating: 4.9,
    level: 'Beginner to Advanced',
    price: '3,999',
    oldPrice: '6,000',
    imageGradient: 'bg-gradient-to-br from-emerald-500 to-teal-700',
  },
  {
    id: 's2',
    title: 'Machine Learning Foundation',
    offerEnds: 'Offer ends in 6 days',
    rating: 4.7,
    level: 'Intermediate',
    price: '4,999',
    oldPrice: '8,000',
    imageGradient: 'bg-gradient-to-br from-fuchsia-500 to-pink-700',
  }
];

const foundationCourses = [
  {
    id: 'f1',
    title: 'C++ Programming Basics',
    offerEnds: 'Limited time offer',
    rating: 4.6,
    level: 'Beginner',
    price: '1,299',
    oldPrice: '2,000',
    imageGradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
    logo: 'C++'
  },
  {
    id: 'f2',
    title: 'Python for Beginners',
    offerEnds: 'Limited time offer',
    rating: 4.8,
    level: 'Beginner',
    price: '1,499',
    oldPrice: '2,500',
    imageGradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    logo: 'Python'
  }
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const renderCourseCard = (course, isEnrolled = false) => (
    <div key={course.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-gray-700 transition-all duration-300 group flex flex-col h-full">
      <div className={`h-32 ${course.imageGradient} p-4 relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transform group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-5 -mb-5"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <span className="bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-md self-start backdrop-blur-sm shadow-sm">
            {course.offerEnds}
          </span>
          {course.logo && (
            <div className="absolute right-2 bottom-2 text-4xl font-black text-white/20 uppercase">
              {course.logo}
            </div>
          )}
          <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md w-3/4">
            {course.title}
          </h3>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-400">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center text-yellow-500 text-sm font-semibold bg-yellow-500/10 px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 mr-1 fill-current" />
            {course.rating}
          </div>
        </div>

        {isEnrolled && (
           <div className="mt-2 mb-4">
             <div className="flex justify-between text-xs text-gray-400 mb-1 font-medium">
               <span>Progress</span>
               <span>{course.progress}%</span>
             </div>
             <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-university-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
             </div>
           </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-800">
          
          <button 
            onClick={() => isEnrolled ? navigate(`/student/courses/${course.id}`) : null}
            className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center ${
            isEnrolled 
              ? 'bg-university-600 text-white hover:bg-university-700' 
              : 'bg-transparent border border-green-500 text-green-500 hover:bg-green-500/10'
          }`}>
            {isEnrolled ? (
              <>Continue Learning <PlayCircle className="w-4 h-4 ml-2" /></>
            ) : (
              'Explore'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      {/* Header & Search */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
            Upskill with Courses
          </h1>
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="What do you want to learn today?"
              className="block w-full pl-12 pr-16 py-4 border-0 rounded-2xl leading-5 bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-university-400 sm:text-md shadow-inner transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute inset-y-2 right-2 px-4 bg-university-500 hover:bg-university-600 text-white rounded-xl font-medium transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Enrolled / Popular Now */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Enrolled Courses</h2>
          <button className="text-sm font-semibold text-university-600 dark:text-university-400 hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(course => renderCourseCard(course, true))}
        </div>
      </section>

      {/* Course Categories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Categories</h2>
        <div className="flex flex-wrap gap-3">
          {courseCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className="flex items-center px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-university-300 dark:hover:border-university-700 transition-all shadow-sm font-medium"
              >
                <Icon className="w-5 h-5 mr-3 text-university-500" />
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Live Courses */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
             <span className="w-3 h-3 rounded-full bg-red-500 mr-3 animate-pulse"></span>
             Live Courses
          </h2>
          <button className="text-sm font-semibold text-university-600 dark:text-university-400 hover:underline">Explore More</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveCourses.map(course => renderCourseCard(course))}
        </div>
      </section>

      {/* Self-Paced Courses */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Self-Paced Courses</h2>
          <button className="text-sm font-semibold text-university-600 dark:text-university-400 hover:underline">Explore More</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selfPacedCourses.map(course => renderCourseCard(course))}
        </div>
      </section>

      {/* Build Your Foundations */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Build Your Foundations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foundationCourses.map(course => renderCourseCard(course))}
        </div>
      </section>

    </div>
  );
}
