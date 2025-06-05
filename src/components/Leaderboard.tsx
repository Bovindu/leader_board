import React from 'react';
import { Contestant } from '../types';
import TopContestants from './TopContestants';
import LeaderboardList from './LeaderboardList';

interface LeaderboardProps {
  data: Contestant[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  // Top 3 contestants for the top display
  const topContestants = data.slice(0, 3);
  
  // Contestants from 4th place and below
  const remainingContestants = data.slice(3);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <TopContestants contestants={topContestants} />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Leaderboard Rankings</h2>
        <LeaderboardList contestants={remainingContestants} />
      </div>
    </div>
  );
};

export default Leaderboard;