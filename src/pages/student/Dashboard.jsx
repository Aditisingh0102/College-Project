import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import Badge from '../../components/shared/Badge';
import { Link } from 'react-router-dom';
import { Trophy, Clock, Code2, Target, ArrowRight, Flame, Coins, Zap, CheckCircle2, Star, PlayCircle, Code, Award, Sparkles, Map, Users, User, BookOpen } from 'lucide-react';

// Dummy Data
const enrolledCourses = [
  { id: 101, title: 'Full-Stack Web Development', progress: 65, instructor: 'Dr. Sarah Jenkins', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop' },
  { id: 102, title: 'Data Structures in Java', progress: 30, instructor: 'Prof. Alan Turing', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop' }
];

export default function Dashboard() {
  const { currentUser, contests } = useAppContext();

  if (!currentUser) return <div>Loading...</div>;

  const upcomingContests = contests.filter(c => c.status === 'Upcoming');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Welcome Banner (Full Width) */}
      <div className="flex-1 bg-gradient-to-br from-university-700 via-university-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-university-50">Pro Student</span>
            </div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
            <p className="text-university-100 max-w-lg text-lg opacity-90">{currentUser.college} • {currentUser.specialization} • Year {currentUser.year}</p>
          </div>
          
          <div className="flex space-x-4 mt-8">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 flex items-center shadow-lg">
              <div className="bg-orange-500/20 p-2 rounded-xl mr-3">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-university-100 uppercase tracking-wider font-bold opacity-80">Daily Streak</p>
                <p className="text-2xl font-black">{currentUser.streak || 0} <span className="text-sm font-medium opacity-80">Days</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Problems Solved" value={currentUser.problemsSolved} icon={CheckCircle2} colorClass="text-green-600 bg-green-100 dark:bg-green-900/30" />
        <StatCard title="Contests Joined" value={currentUser.contestsParticipated || 5} icon={Trophy} colorClass="text-amber-600 bg-amber-100 dark:bg-amber-900/30" />
        <StatCard title="Current Streak" value={`${currentUser.streak || 0} Days`} icon={Flame} colorClass="text-orange-500 bg-orange-100 dark:bg-orange-900/30" />
        <StatCard title="Certificates Earned" value="2" icon={Award} colorClass="text-purple-600 bg-purple-100 dark:bg-purple-900/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Contests */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Contests</h2>
              <Link to="/student/contests" className="text-sm text-university-600 dark:text-university-400 hover:underline">View all</Link>
            </div>
            <div className="grid gap-4">
              {upcomingContests.length > 0 ? (
                upcomingContests.map(contest => (
                  <div key={contest.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex items-center justify-between hover:border-university-500 transition-colors shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{contest.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date(contest.startTime).toLocaleString()} • {contest.durationMins} mins</p>
                      </div>
                    </div>
                    <button className="px-5 py-2 bg-university-600 hover:bg-university-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                      Register
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">No Upcoming Contests</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-4">You're all caught up! Keep practicing in the problems section to prepare for the next challenge.</p>
                  <Link to="/student/problems" className="inline-flex items-center text-university-600 font-bold hover:text-university-700">
                    Go to Practice <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Enrolled Courses & Batch Info */}
        <div className="space-y-8">
          
          {/* Enrolled Courses */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Enrolled Courses</h2>
              <Link to="/student/courses" className="text-sm text-university-600 dark:text-university-400 hover:underline">View all</Link>
            </div>
            <div className="space-y-4">
              {enrolledCourses.map(course => (
                <Link to={`/student/courses/${course.id}`} key={course.id} className="block group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-university-400 transition-all">
                  <div className="relative h-24 overflow-hidden">
                     <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-university-600 dark:group-hover:text-university-400 transition-colors">{course.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{course.instructor}</p>
                    
                    <div className="flex items-center justify-between space-x-4">
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                         <div className="h-full bg-university-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{course.progress}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Batch Details */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Batch Info</h2>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
               <div className="space-y-4">
                 
                 <div className="flex items-center space-x-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                   <div className="p-2 bg-university-50 dark:bg-university-900/30 text-university-600 dark:text-university-400 rounded-lg">
                     <Users className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Batch Name</p>
                     <p className="font-bold text-gray-900 dark:text-white">B.Tech CSE 2026 Alpha</p>
                   </div>
                 </div>

                 <div className="flex items-center space-x-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                   <div className="p-2 bg-university-50 dark:bg-university-900/30 text-university-600 dark:text-university-400 rounded-lg">
                     <User className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">User ID</p>
                     <p className="font-bold text-gray-900 dark:text-white text-sm font-mono">{currentUser.id}</p>
                   </div>
                 </div>

                 <div className="flex items-center space-x-3">
                   <div className="p-2 bg-university-50 dark:bg-university-900/30 text-university-600 dark:text-university-400 rounded-lg">
                     <BookOpen className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Batch Course</p>
                     <p className="font-bold text-gray-900 dark:text-white">Computer Science Core</p>
                   </div>
                 </div>

               </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
