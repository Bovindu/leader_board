import React from 'react';
import { GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GraduationCap size={32} className="mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold">Coursera Leaderboard PGP Glass Ceylon PLC</h1>
          </div>
          <div className="flex items-center">
            <p className="text-sm md:text-base text-blue-100">
              Last updated: <span className="font-semibold">{new Date().toLocaleDateString()}</span>
            </p>
          </div>
        </div>
        <p className="mt-2 text-blue-100 text-sm md:text-base max-w-2xl">
          Track the top learners and their impressive learning hours. Updated daily by administrators.
        </p>
        <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-blue-100">Total Pool Price:</span>
            <span className="ml-2 font-bold text-white">Rs. 30,000</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-blue-100">Price per Hour:</span>
            <span className="ml-2 font-bold text-white">Rs. 100</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;