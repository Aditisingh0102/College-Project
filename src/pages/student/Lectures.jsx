import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { PlayCircle, Clock, Play, FileText, MessageSquare, Download } from 'lucide-react';

export default function Lectures() {
  const { lectures, faculty, currentUser } = useAppContext();

  const myLectures = lectures.filter(lecture => currentUser?.enrolledBatches?.includes(lecture.batchId));
  const [activeLectureId, setActiveLectureId] = useState(myLectures.length > 0 ? myLectures[0].id : null);
  const [activeTab, setActiveTab] = useState('Overview');

  // If activeLectureId is not set, set it to first
  useEffect(() => {
    if (!activeLectureId && myLectures.length > 0) {
      setActiveLectureId(myLectures[0].id);
    }
  }, [myLectures, activeLectureId]);

  const activeLecture = myLectures.find(l => l.id === activeLectureId);
  const activeFaculty = activeLecture ? (faculty.find(f => f.id === activeLecture?.facultyId) || { name: 'Unknown Faculty', photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" }) : null;

  if (myLectures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        <PlayCircle className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-700" />
        <h2 className="text-xl font-bold mb-2">No Lectures Available</h2>
        <p>You haven't been assigned any lectures yet.</p>
      </div>
    );
  }

  if (!activeLecture) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Dashboard</h1>
      </div>
      
      <div className="lg:grid lg:grid-cols-3 gap-8 items-start">
        {/* Main Video Area - Col Span 2 */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Video Player Mock */}
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 group">
            <img 
              src={activeLecture.thumbnailUrl} 
              alt={activeLecture.title} 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-university-600/90 hover:bg-university-600 text-white p-5 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:scale-110 transition-all duration-300">
                <Play className="w-10 h-10 ml-1" fill="currentColor" />
              </button>
            </div>
            
            {/* Progress Bar Mock */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800">
              <div className="h-full bg-university-500 w-1/3"></div>
            </div>
          </div>

          {/* Video Meta */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-university-100 text-university-700 dark:bg-university-900/30 dark:text-university-400 text-xs font-bold uppercase tracking-wider rounded-lg">
                {activeLecture.subject}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" /> {activeLecture.durationMins} mins
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">•</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{activeLecture.views} views</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">•</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{new Date(activeLecture.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">{activeLecture.title}</h2>
            
            {/* Faculty Info Banner */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 mb-8">
              <img src={activeFaculty.photoUrl} alt="Faculty" className="w-14 h-14 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{activeFaculty.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Course Instructor</p>
              </div>
              <button className="ml-auto px-4 py-2 border border-university-200 text-university-600 dark:border-university-800 dark:text-university-400 text-sm font-semibold rounded-lg hover:bg-university-50 dark:hover:bg-university-900/20 transition-colors hidden sm:block">
                View Profile
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-800 mb-6">
              <div className="flex space-x-8">
                {['Overview', 'Resources', 'Q&A'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold relative transition-colors ${
                      activeTab === tab 
                        ? 'text-university-600 dark:text-university-400' 
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
                  >
                    <span className="flex items-center">
                      {tab === 'Overview' && <FileText className="w-4 h-4 mr-2" />}
                      {tab === 'Resources' && <Download className="w-4 h-4 mr-2" />}
                      {tab === 'Q&A' && <MessageSquare className="w-4 h-4 mr-2" />}
                      {tab}
                    </span>
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-university-600 dark:bg-university-400 rounded-t-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content Area */}
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
              {activeTab === 'Overview' && (
                <div className="animate-in fade-in">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About this lecture</h3>
                  <p>{activeLecture.description}</p>
                </div>
              )}
              {activeTab === 'Resources' && (
                <div className="animate-in fade-in flex flex-col items-center justify-center py-8 text-gray-500">
                   <Download className="w-10 h-10 mb-3 text-gray-400" />
                   <p>No downloadable resources for this lecture.</p>
                </div>
              )}
              {activeTab === 'Q&A' && (
                <div className="animate-in fade-in flex flex-col items-center justify-center py-8 text-gray-500">
                   <MessageSquare className="w-10 h-10 mb-3 text-gray-400" />
                   <p>Be the first to ask a question!</p>
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* Playlist Sidebar - Col Span 1 */}
        <div className="lg:col-span-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg lg:sticky lg:top-[140px]">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111]">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Course Content</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{myLectures.length} lectures</p>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto no-scrollbar divide-y divide-gray-100 dark:divide-gray-800/50">
            {myLectures.map((lecture, index) => {
              const isActive = activeLectureId === lecture.id;
              
              return (
                <div 
                  key={lecture.id}
                  onClick={() => setActiveLectureId(lecture.id)}
                  className={`flex items-start p-4 cursor-pointer transition-colors ${
                    isActive 
                      ? 'bg-university-50 dark:bg-university-900/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-[#222]'
                  }`}
                >
                  <div className="text-gray-400 font-medium text-sm w-6 pt-1 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className={`text-sm font-semibold mb-1 line-clamp-2 ${isActive ? 'text-university-700 dark:text-university-400' : 'text-gray-900 dark:text-gray-200'}`}>
                      {lecture.title}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center">
                      <PlayCircle className="w-3 h-3 mr-1" /> {lecture.durationMins} mins
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
