import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Calendar, Clock, BookOpen, Search, Code, Video } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function CreateAssessment() {
  const { currentUser, problems, lectures, addToast } = useAppContext();
  
  // Faculty specific questions based on their subjects
  const facultyQuestions = problems.filter(p => p.type === 'Coding');

  const handlePublish = () => {
    addToast("Assessment has been successfully scheduled and published!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Schedule New Contest</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Create a time-locked coding contest mapped to your subjects.</p>
      </div>

      <form className="space-y-8">
        {/* Basic Details */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">1. Contest Details</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contest Title</label>
            <input type="text" placeholder="e.g., DSA Mid-Term Coding Challenge" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject Mapping</label>
              <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white">
                {currentUser?.subjectsTaught?.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Batches</label>
              <select multiple className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white h-24">
                {currentUser?.assignedBatches?.map(b => (
                  <option key={b} value={b}>Batch {b}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scheduling */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">2. Strict Scheduling</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date & Time</label>
              <div className="relative">
                <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="datetime-local" className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date & Time</label>
              <div className="relative">
                <Clock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="datetime-local" className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* LeetCode Style Problem Selection */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Select Coding Problems</h2>
            <button type="button" className="text-sm font-medium text-university-600 dark:text-university-400 hover:underline">
              + Create New Problem
            </button>
          </div>
          
          <div className="space-y-3">
            {facultyQuestions.map(q => (
              <label key={q.id} className="flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition">
                <input type="checkbox" className="w-5 h-5 text-university-600 rounded focus:ring-university-500 border-gray-300 dark:border-gray-600 dark:bg-gray-900" />
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center"><Code className="w-4 h-4 mr-2 text-gray-400" /> {q.title}</h4>
                  <div className="flex space-x-2 mt-2">
                    <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'}>{q.difficulty}</Badge>
                    {q.tags.map(t => <span key={t} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{t}</span>)}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Post-Contest Solution Video */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">4. Attach Solution Walkthrough</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              This solution video will remain completely hidden from students until the contest's Scheduled End Time has passed.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Pre-recorded Lecture/Editorial</label>
            <div className="relative">
              <Video className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white">
                <option value="">-- Do not attach a solution --</option>
                {lectures.map(l => (
                  <option key={l.id} value={l.id}>{l.title} ({l.durationMins} mins)</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            Save as Draft
          </button>
          <button onClick={handlePublish} type="button" className="px-8 py-3 bg-university-600 hover:bg-university-700 text-white font-medium rounded-xl shadow-lg shadow-university-600/30 transition-all">
            Schedule Contest
          </button>
        </div>
      </form>
    </div>
  );
}
