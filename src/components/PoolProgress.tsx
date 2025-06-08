import React from 'react';
import { leaderboardData } from '../data/leaderboard-data';
import { PRICE_CONFIG } from '../config/constants';

const PoolProgress: React.FC = () => {
  const totalHours = leaderboardData.reduce((sum, contestant) => sum + contestant.hours, 0);
  const totalPrizeAwarded = totalHours * PRICE_CONFIG.PRICE_PER_HOUR;
  const remainingPool = Math.max(0, PRICE_CONFIG.POOL_PRICE - totalPrizeAwarded); // Ensure it doesn't go below 0
  const progressPercentage = Math.min(100, (totalPrizeAwarded / PRICE_CONFIG.POOL_PRICE) * 100); // Cap at 100%
  const remainingPercentage = Math.max(0, progressPercentage); // Remaining percentage

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-8 animate-fade-in">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Pool Prize Distribution</span>
          <span className="text-gray-600">
            Remaining: <span className={`font-bold ${remainingPool === 0 ? 'text-red-600' : 'text-blue-600'}`}>
              Rs. {remainingPool.toLocaleString()}
            </span>
          </span>
        </div>
        
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`absolute left-0 top-0 h-full transition-all duration-1000 ease-out ${
              progressPercentage >= 100 ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
          {remainingPool > 0 && (
            <div 
              className="absolute right-0 top-0 h-full bg-green-400 transition-all duration-1000 ease-out"
              style={{ width: `${remainingPercentage}%` }}
            />
          )}
        </div>
        
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-600">
            Awarded: <span className={`font-semibold ${progressPercentage >= 100 ? 'text-red-600' : 'text-blue-600'}`}>
              Rs. {totalPrizeAwarded.toLocaleString()}
            </span>
            {totalPrizeAwarded > PRICE_CONFIG.POOL_PRICE && (
              <span className="ml-2 text-red-500 font-bold">(Exceeds Pool!)</span>
            )}
          </span>
          <span className="text-gray-600">
            Total Pool: <span className="font-semibold">Rs. {PRICE_CONFIG.POOL_PRICE.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PoolProgress;