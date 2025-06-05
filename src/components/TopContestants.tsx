import React from 'react';
import { Contestant } from '../types';
import { Trophy } from 'lucide-react';
import { PRICE_CONFIG } from '../config/constants';

interface TopContestantsProps {
  contestants: Contestant[];
}

const TopContestants: React.FC<TopContestantsProps> = ({ contestants }) => {
  const topThree = contestants.slice(0, 3);
  
  const orderedContestants = [
    topThree[1], // 2nd place
    topThree[0], // 1st place
    topThree[2], // 3rd place
  ];

  const trophyColors = {
    1: "text-yellow-400", // Gold
    2: "text-gray-400",   // Silver
    3: "text-amber-700",  // Bronze
  };

  const getTrophySize = (rank: number) => {
    switch (rank) {
      case 1: return 32;
      default: return 24;
    }
  };

  const getAnimationClass = (index: number) => {
    const baseClass = "animate-bounce-in";
    return `${baseClass} animate-delay-${index + 1}`;
  };

  const calculatePrize = (hours: number) => {
    return hours * PRICE_CONFIG.PRICE_PER_HOUR;
  };

  return (
    <div className="flex flex-col items-center w-full mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-fade-in">Top Learners</h2>
      <div className="flex flex-col md:flex-row justify-center items-end gap-4 w-full">
        {orderedContestants.map((contestant, index) => {
          const isFirst = contestant.rank === 1;
          const prize = calculatePrize(contestant.hours);
          
          return (
            <div 
              key={contestant.id}
              className={`relative flex flex-col items-center p-4 md:p-6 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg ${
                isFirst 
                ? "bg-blue-100 md:h-80 w-full md:w-64 z-10 border-t-4 border-blue-500 hover:-translate-y-2" 
                : "bg-white md:h-72 w-full md:w-56 hover:-translate-y-1"
              } ${getAnimationClass(index)}`}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md animate-scale-in">
                <Trophy className={`${trophyColors[contestant.rank as keyof typeof trophyColors]}`} size={getTrophySize(contestant.rank)} />
              </div>
              
              <div className="mt-6 mb-3">
                <div className={`relative ${isFirst ? "h-28 w-28" : "h-24 w-24"} rounded-full overflow-hidden border-4 ${
                  contestant.rank === 1 ? "border-yellow-400" : 
                  contestant.rank === 2 ? "border-gray-400" : "border-amber-700"
                }`}>
                  <img 
                    src={contestant.profilePic} 
                    alt={contestant.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              <h3 className={`font-bold text-center mt-2 ${isFirst ? "text-xl" : "text-lg"}`}>{contestant.name}</h3>
              
              <div className="flex items-center mt-2">
                <span className={`${isFirst ? "text-3xl" : "text-2xl"} font-bold text-blue-600`}>Rs. {prize.toLocaleString()}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className={`${isFirst ? "text-3xl" : "text-2xl"} font-bold text-blue-600`}>{contestant.hours}</span>
                <span className="ml-1 text-gray-600">hours</span>
              </div>
              
              <div className={`absolute top-4 right-4 ${
                contestant.rank === 1 ? "bg-yellow-400" : 
                contestant.rank === 2 ? "bg-gray-400" : "bg-amber-700"
              } text-white rounded-full h-8 w-8 flex items-center justify-center font-bold animate-scale-in`}>
                {contestant.rank}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopContestants;