import React from 'react';
import { leaderboardData } from '../data/leaderboard-data';
import { PRICE_CONFIG } from '../config/constants';

const PoolProgress: React.FC = () => {
  const totalHours = leaderboardData.reduce((sum, contestant) => sum + contestant.hours, 0);
  const totalPrizeAwarded = totalHours * PRICE_CONFIG.PRICE_PER_HOUR;
  const remainingPool = PRICE_CONFIG.POOL_PRICE - totalPrizeAwarded;
  const progressPercentage = (totalPrizeAwarded / PRICE_CONFIG.POOL_PRICE) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-8 animate-fade-in">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Pool Prize Distribution</span>
          <span className="text-gray-600">
            Remaining: <span className="font-bold text-blue-600">Rs. {remainingPool.toLocaleString()}</span>
          </span>
        </div>
        
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-600">
            Awarded: <span className="font-semibold text-blue-600">Rs. {totalPrizeAwarded.toLocaleString()}</span>
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