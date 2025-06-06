import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { PRICE_CONFIG } from '../config/constants';
import { leaderboardData } from '../data/leaderboard-data';

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState({
    lastUpdated: '2025-06-06',
    poolPrize: PRICE_CONFIG.POOL_PRICE,
    pricePerHour: PRICE_CONFIG.PRICE_PER_HOUR,
    contestants: leaderboardData
      .map(contestant => ({
        id: contestant.id,
        name: contestant.name,
        hours: contestant.hours
      }))
      .sort((a, b) => b.hours - a.hours) // Sort by hours descending
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update your backend/data store
    console.log('Form submitted:', formData);
    alert('Leaderboard updated successfully!');
  };

  const handleContestantChange = (id: number, hours: number) => {
    setFormData(prev => ({
      ...prev,
      contestants: prev.contestants
        .map(c => c.id === id ? { ...c, hours } : c)
        .sort((a, b) => b.hours - a.hours) // Re-sort after update
    }));
  };

  const totalHours = formData.contestants.reduce((sum, contestant) => sum + contestant.hours, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Link to="/" className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Settings */}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, poolPrize: parseInt(e.target.value) || 0 }))}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, pricePerHour: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Current Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-blue-600">Total Learning Hours:</span>
                  <span className="ml-2 font-bold">{totalHours}</span>
                </div>
                <div>
                  <span className="text-blue-600">Total Prize Awarded:</span>
                  <span className="ml-2 font-bold">Rs. {(totalHours * formData.pricePerHour).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-blue-600">Remaining Pool:</span>
                  <span className="ml-2 font-bold">Rs. {(formData.poolPrize - (totalHours * formData.pricePerHour)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Contestant Hours */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Contestant Hours</h2>
              <div className="space-y-3">
                {formData.contestants.map((contestant, index) => (
                  <div key={contestant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full min-w-[40px] text-center">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-700 min-w-[200px]">{contestant.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={contestant.hours}
                        onChange={(e) => handleContestantChange(contestant.id, parseInt(e.target.value) || 0)}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        min="0"
                      />
                      <span className="text-sm text-gray-500 min-w-[50px]">hours</span>
                      <span className="text-sm text-blue-600 font-medium min-w-[100px] text-right">
                        Rs. {(contestant.hours * formData.pricePerHour).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Save size={20} className="mr-2" />
                Update Leaderboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;