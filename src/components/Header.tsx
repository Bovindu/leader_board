import React from 'react';
import { GraduationCap, Info } from 'lucide-react';
import { PRICE_CONFIG } from '../config/constants';
import { leaderboardData } from '../data/leaderboard-data';
import { DATE_CONFIG } from '../config/date_up';

const Header: React.FC = () => {
  const totalHours = leaderboardData.reduce((sum, contestant) => sum + contestant.hours, 0);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GraduationCap size={32} className="mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold">Coursera Leaderboard PGP Glass Ceylon PLC</h1>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm md:text-base text-blue-100 mb-1">
              Last updated: <span className="font-semibold">{DATE_CONFIG.LATEST_UPDATE.toLocaleString()}</span>
            </p>
            <p className="text-sm md:text-base text-blue-100">
              Total Learning Hours: <span className="font-semibold">{PRICE_CONFIG.TOTAL_HOURS+totalHours}</span>
            </p>
          </div>
        </div>
        <p className="mt-2 text-blue-100 text-sm md:text-base max-w-2xl">
          Track the top learners and their impressive learning hours. Updated daily by administration.
        </p>
        <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-blue-100">Total Pool Prize:</span>
            <span className="ml-2 font-bold text-white">Rs. {PRICE_CONFIG.POOL_PRICE.toLocaleString()}</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-blue-100">Prize per Hour:</span>
            <span className="ml-2 font-bold text-white">Rs. {PRICE_CONFIG.PRICE_PER_HOUR.toLocaleString()}</span>
          </div>
        </div>

        {/* Conditions Apply Statement */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-start gap-2">
            <Info size={20} className="text-yellow-300 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-300 font-semibold mb-2">Special Conditions Apply:</h3>
              <ul className="text-blue-100 text-sm space-y-1">
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">•</span>
                  <span>If any member reaches <strong>5,000 earning hours</strong>, the Prize per Hour will be reduced to <strong>LKR 50</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">•</span>
                  <span>If a member reaches <strong>6,000 earning hours</strong>, the Prize per Hour will further reduce to <strong>LKR 20 per hour</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;