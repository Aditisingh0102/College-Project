import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { UploadCloud, Video, CheckCircle2 } from 'lucide-react';
import Badge from '../../components/shared/Badge';

export default function UploadLecture() {
  const { currentUser, lectures } = useAppContext();
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      addToast("Lecture successfully published to Batch CSE-B 2024!", "success");
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  const myLectures = lectures.filter(l => l.facultyId === currentUser?.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Lecture</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Publish recorded lectures and tutorials for your assigned batches.</p>
      </div>

      <form onSubmit={handleUpload} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Video Title</label>
              <input required type="text" placeholder="e.g., Introduction to Dynamic Programming" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject Mapping</label>
              <select required className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white">
                {currentUser?.subjectsTaught?.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Batch(es)</label>
              <select multiple required className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white h-24">
                {currentUser?.assignedBatches?.map(b => <option key={b} value={b}>Batch {b}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4 flex flex-col h-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Video File</label>
            <div className="flex-1 w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer group">
              <UploadCloud className="w-12 h-12 text-gray-400 group-hover:text-university-500 mb-3 transition-colors" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">MP4, WebM (Max 500MB)</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description / Notes</label>
          <textarea rows={3} placeholder="Add any notes or links to external resources..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-university-500 outline-none text-gray-900 dark:text-white"></textarea>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
          <button type="submit" disabled={isUploading || isSuccess} className={`px-8 py-3 font-medium rounded-xl shadow-sm transition-all flex items-center ${isSuccess ? 'bg-green-600 text-white' : isUploading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-university-600 hover:bg-university-700 text-white'}`}>
            {isSuccess ? <><CheckCircle2 className="w-5 h-5 mr-2"/> Published</> : isUploading ? 'Uploading...' : 'Publish Lecture'}
          </button>
        </div>
      </form>

      <div className="pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">My Uploaded Lectures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myLectures.map(l => (
            <div key={l.id} className="flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <img src={l.thumbnailUrl} alt="" className="w-1/3 object-cover" />
              <div className="p-4 flex flex-col justify-center w-2/3">
                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{l.title}</h4>
                <p className="text-xs text-gray-500 mb-2">{l.subject} • Batch {l.batchId}</p>
                <div className="flex justify-between items-center mt-auto">
                  <Badge variant="primary">{l.views} views</Badge>
                  <button className="text-xs text-university-600 hover:underline">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
