import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function Profile() {
  const { currentUser } = useAppContext();
  
  if (!currentUser) return null;

  return (
    <div className="p-8 text-center animate-in fade-in">
      <img src={currentUser.photoUrl} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
      <h1 className="text-2xl font-bold mb-2">{currentUser.name}</h1>
      <p className="text-gray-500">{currentUser.erpId} • {currentUser.email}</p>
      <p className="mt-4 text-sm text-gray-400">Profile detailed view placeholder.</p>
    </div>
  );
}
