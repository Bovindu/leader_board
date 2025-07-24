import React from 'react';
import { Contestant } from '../types';
import TopContestants from './TopContestants';
import LeaderboardList from './LeaderboardList';
import PoolProgress from './PoolProgress';
import { Info } from 'lucide-react';

interface LeaderboardProps {
  data: Contestant[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const topContestants = data.slice(0, 3);
  const remainingContestants = data.slice(3);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <PoolProgress />
      <TopContestants contestants={topContestants} />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Leaderboard Rankings</h2>
        <LeaderboardList contestants={remainingContestants} />
        
        {/* Special Conditions Statement */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-800 font-semibold mb-2">Special Conditions Apply:</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>If a member reaches <strong>150 hours </strong>, the Prize per Hour for the learner will be increased to <strong>LKR 40</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>If a member reaches <strong>300 hours </strong>, the Prize per Hour for the learner will be further increased to <strong>LKR 60</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
