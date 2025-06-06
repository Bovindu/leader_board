import React, { useState } from 'react';
import { PRICE_CONFIG } from '../config/constants';
import { leaderboardData } from '../data/leaderboard-data';

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState({
    lastUpdated: '2025-06-06',
    poolPrize: PRICE_CONFIG.POOL_PRICE,
    pricePerHour: PRICE_CONFIG.PRICE_PER_HOUR,
    contestants: leaderboardData.map(contestant => ({
      id: contestant.id,
      name: contestant.name,
      hours: contestant.hours
    }))
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update your backend
    console.log('Form submitted:', formData);
  };

  const handleContestantChange = (id: number, hours: number) => {
    setFormData(prev => ({
      ...prev,
      contestants: prev.contestants.map(c => 
        c.id === id ? { ...c, hours } : c
      ).sort((a, b) => b.hours - a.hours) // Sort by hours in descending order
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Updated
              </label>
              <input
                type="date"
                value={formData.lastUpdated}
                onChange={(e) => setFormData(prev => ({ ...prev, lastUpdated: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Pool Prize (Rs.)
              </label>
              <input
                type="number"
                value={formData.poolPrize}
                onChange={(e) => setFormData(prev => ({ ...prev, poolPrize: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per Hour (Rs.)
              </label>
              <input
                type="number"
                value={formData.pricePerHour}
                onChange={(e) => setFormData(prev => ({ ...prev, pricePerHour: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Contestant Hours</h2>
            <div className="space-y-4">
              {formData.contestants.map((contestant, index) => (
                <div key={contestant.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 min-w-[200px]">{contestant.name}</span>
                  <input
                    type="number"
                    value={contestant.hours}
                    onChange={(e) => handleContestantChange(contestant.id, parseInt(e.target.value))}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-500">Current Rank: {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Leaderboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;