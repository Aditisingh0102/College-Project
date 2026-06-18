import React from 'react';
import { useParams } from 'react-router-dom';

export default function ContestDetail() {
  const { id } = useParams();
  
  return (
    <div className="p-8 text-center animate-in fade-in">
      <h1 className="text-2xl font-bold mb-4">Contest {id}</h1>
      <p className="text-gray-500">Contest dashboard and problem list placeholder.</p>
    </div>
  );
}
