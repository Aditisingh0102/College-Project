import React from 'react';
import { BookOpen, FolderPlus, UploadCloud, FileText, Download, MoreHorizontal, FileIcon, VideoIcon } from 'lucide-react';
import Badge from '../../../components/shared/Badge';

export default function CurriculumResources() {
  const folders = [
    { id: 1, name: 'Syllabus & Guidelines', files: 3, updated: '2 days ago' },
    { id: 2, name: 'Lecture Presentations', files: 12, updated: '5 hours ago' },
    { id: 3, name: 'Reference Textbooks (PDFs)', files: 4, updated: '1 week ago' },
  ];

  const recentFiles = [
    { id: 1, name: 'Week_4_Graph_Theory_Notes.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: 'You' },
    { id: 2, name: 'Trees_Introduction_Deck.pptx', type: 'doc', size: '5.1 MB', uploadedBy: 'You' },
    { id: 3, name: 'Recorded_Session_Oct10.mp4', type: 'video', size: '145 MB', uploadedBy: 'System' },
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'video': return <VideoIcon className="w-8 h-8 text-purple-500" />;
      case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
      default: return <FileIcon className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-teal-600" /> Curriculum & Resources
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage all digital reading materials, notes, and curriculum guidelines.</p>
        </div>
        
        <div className="flex space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center">
            <FolderPlus className="w-4 h-4 mr-2" /> New Folder
          </button>
          <button className="flex-1 md:flex-none px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center justify-center">
            <UploadCloud className="w-4 h-4 mr-2" /> Upload File
          </button>
        </div>
      </div>

      <div className="space-y-8">
        
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Resource Folders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map(folder => (
              <div key={folder.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex items-start space-x-4 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition-all cursor-pointer group">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl">
                  <FolderPlus className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors line-clamp-1">{folder.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                    <span>{folder.files} files</span>
                    <span>•</span>
                    <span>{folder.updated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recently Uploaded Files</h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <div className="flex items-center space-x-4 flex-1">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-sm group-hover:text-teal-600 transition-colors cursor-pointer">{file.name}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-0.5 space-x-3">
                        <span>{file.size}</span>
                        <span>Uploaded by {file.uploadedBy}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-colors" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
