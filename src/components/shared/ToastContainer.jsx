import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useAppContext();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`flex items-center p-4 rounded-xl shadow-lg border animate-in slide-in-from-right-8 duration-300 ${
            toast.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-300' 
              : toast.type === 'error'
              ? 'bg-red-50 dark:bg-red-900/40 border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-300'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />}
          <p className="text-sm font-medium pr-8">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
