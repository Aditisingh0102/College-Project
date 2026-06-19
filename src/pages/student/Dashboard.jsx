import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import Badge from '../../components/shared/Badge';
import { Link } from 'react-router-dom';
import { Trophy, Clock, Code2, Target, ArrowRight, Flame, Coins, Zap, CheckCircle2, Star, PlayCircle, Code } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, contests, lectures, problems } = useAppContext();

  if (!currentUser) return <div>Loading...</div>;

  const upcomingContests = contests.filter(c => c.status === 'Upcoming');
  const recentLectures = lectures.slice(0, 2);
  const recommendedProblems = problems.filter(p => p.status === 'Unsolved').slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-6">
        {/* Welcome Banner */}
        <div className="flex-1 bg-gradient-to-r from-university-600 to-university-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}!</h1>
              <p className="text-university-100 max-w-lg">{currentUser.college} • {currentUser.specialization} • {currentUser.year}</p>
            </div>
            <div className="flex space-x-6 mt-8">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center">
                <Flame className="w-5 h-5 text-orange-400 mr-2" />
                <div>
                  <p className="text-xs text-university-200 uppercase tracking-wider font-bold">Daily Streak</p>
                  <p className="text-xl font-bold">{currentUser.streak || 0} Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Challenge Widget */}
        <div className="md:w-80 bg-white dark:bg-gray-900 border border-university-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-university-500 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-university-50/50 to-transparent dark:from-university-900/10"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-university-100 dark:bg-university-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-university-600 dark:text-university-400" />
            </div>
            <Badge variant="warning" className="mb-2">Daily Challenge</Badge>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Two Sum IV - Input is a BST</h3>
            <p className="text-sm text-gray-500 mt-2 mb-4">Solve the daily challenge to maintain your streak!</p>
            <button className="w-full bg-university-600 hover:bg-university-700 text-white font-medium py-2.5 rounded-xl transition-colors shadow-md">
              Solve Now
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Problems Solved" value={currentUser.problemsSolved} icon={CheckCircle2} colorClass="text-green-600 bg-green-100 dark:bg-green-900/30" />
        <StatCard title="Contests Joined" value={currentUser.contestsParticipated} icon={Trophy} colorClass="text-amber-600 bg-amber-100 dark:bg-amber-900/30" />
        <StatCard title="Current Streak" value="12 Days" icon={Flame} colorClass="text-orange-500 bg-orange-100 dark:bg-orange-900/30" />
        <StatCard title="Overall Rating" value={currentUser.rating} icon={Star} colorClass="text-university-600 bg-university-100 dark:bg-university-900/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Contests & Problems */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Contests */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Contests</h2>
              <Link to="/student/contests" className="text-sm text-university-600 dark:text-university-400 hover:underline">View all</Link>
            </div>
            <div className="grid gap-4">
              {upcomingContests.map(contest => (
                <div key={contest.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex items-center justify-between hover:border-university-500 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{contest.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(contest.startTime).toLocaleString()} • {contest.durationMins} mins</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-university-600 hover:bg-university-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Problems */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Problems</h2>
              <Link to="/student/problems" className="text-sm text-university-600 dark:text-university-400 hover:underline">View all</Link>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              {recommendedProblems.map((problem, i) => (
                <Link to={`/student/problems/${problem.id}`} key={problem.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${i !== recommendedProblems.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">{problem.title}</span>
                  </div>
                  <Badge variant={problem.difficulty === 'Easy' ? 'success' : problem.difficulty === 'Medium' ? 'warning' : 'danger'}>
                    {problem.difficulty}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Lectures */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Continue Watching</h2>
            <Link to="/student/lectures" className="text-sm text-university-600 dark:text-university-400 hover:underline">All Lectures</Link>
          </div>
          {recentLectures.map(lecture => (
            <div key={lecture.id} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                <img src={lecture.thumbnailUrl} alt={lecture.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-medium">
                  {lecture.durationMins}:00
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{lecture.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lecture.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
