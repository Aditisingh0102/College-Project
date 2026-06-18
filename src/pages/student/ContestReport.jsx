import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle2, XCircle, Clock, PlayCircle, Trophy, BarChart3, Lock } from 'lucide-react';
import StatCard from '../../components/shared/StatCard';

export default function ContestReport() {
  const { id } = useParams();
  const { contests, submissions, currentUser, lectures } = useAppContext();
  
  const contest = contests.find(c => c.id === id);
  const submission = submissions.find(s => s.contestId === id && s.studentId === currentUser?.id);
  
  if (!contest) return null;

  const now = new Date();
  const endTime = new Date(contest.scheduledEndTime);
  const isEndedGlobal = now > endTime;

  const solutionVideo = lectures.find(l => l.id === contest.solutionVideoId);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <BarChart3 className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <Badge variant="success" className="mb-4 inline-block">Submission Evaluated</Badge>
          <h1 className="text-3xl font-bold mb-2">Performance Report: {contest.title}</h1>
          <p className="text-gray-300">Submitted on {new Date(submission?.submittedAt || now).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-university-600 dark:text-university-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Batch Rank</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">#{submission?.rank || '--'}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Score</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{submission?.score || 0} / 100</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Test Case Accuracy</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{submission?.accuracy || 0}%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Official Solution & Editorial</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review the faculty walkthrough to understand optimal approaches.</p>
        </div>
        
        <div className="p-8">
          {isEndedGlobal ? (
            solutionVideo ? (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3 group relative aspect-video bg-gray-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-800">
                  <img src={solutionVideo.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-university-600/90 text-white rounded-full p-4 transform group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-12 h-12" />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{solutionVideo.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{solutionVideo.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" /> Duration: {solutionVideo.durationMins} mins
                    </div>
                    <Link to="/student/problems" className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                      Practice Similar Problems
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                No solution video was attached to this contest.
              </div>
            )
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Solution Locked</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                The solution walkthrough is strictly locked until the contest window completely closes globally for all batches at {endTime.toLocaleString()}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
