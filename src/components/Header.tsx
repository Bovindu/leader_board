import React from 'react';
import { GraduationCap } from 'lucide-react';
import { PRICE_CONFIG } from '../config/constants';
import { leaderboardData } from '../data/leaderboard-data';
import { DATE_CONFIG } from '../config/date_up';

const Header: React.FC = () => {
  const totalHours = leaderboardData.reduce((sum, contestant) => sum + contestant.hours, 0);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GraduationCap size={28} className="mr-2" />
            <h1 className="text-xl md:text-2xl font-bold">Coursera Leaderboard PGP Glass Ceylon PLC</h1>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm md:text-base text-blue-100 mb-1">
              Last updated: <span className="font-semibold">{DATE_CONFIG.LATEST_UPDATE.toLocaleString()}</span>
            </p>
            <p className="text-xs md:text-sm text-blue-100">
              Total Learning Hours: <span className="font-semibold">{PRICE_CONFIG.TOTAL_HOURS+totalHours}</span>
            </p>
          </div>
        </div>
        <p className="mt-2 text-blue-100 text-xs md:text-sm max-w-2xl">
          Track the top learners and their impressive learning hours. Updated daily by administration.
        </p>
        <div className="mt-3 flex flex-col md:flex-row gap-3 md:gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-blue-100 text-sm">Total Pool Prize:</span>
            <span className="ml-2 font-bold text-white text-sm">Rs. {PRICE_CONFIG.POOL_PRICE.toLocaleString()}</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-blue-100 text-sm">Prize per Hour:</span>
            <span className="ml-2 font-bold text-white text-sm">Rs. {PRICE_CONFIG.PRICE_PER_HOUR.toLocaleString()}</span>
            <span className="ml-1 text-yellow-300 font-bold">*</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;