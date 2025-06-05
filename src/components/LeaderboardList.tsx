import React from 'react';
import { Contestant } from '../types';
import { Award, DollarSign } from 'lucide-react';

interface LeaderboardListProps {
  contestants: Contestant[];
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ contestants }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Rank</th>
              <th className="py-3 px-6 text-left">Learner</th>
              <th className="py-3 px-6 text-left">Learning Hours</th>
              <th className="py-3 px-6 text-right">Winning Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y divide-gray-200">
            {contestants.map((contestant) => (
              <tr 
                key={contestant.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 font-medium">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                      {contestant.rank}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border border-gray-200">
                      <img 
                        src={contestant.profilePic} 
                        alt={contestant.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{contestant.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center">
                    <Award className="text-blue-500 mr-1" size={18} />
                    <span className="font-bold text-blue-600">{contestant.hours}</span>
                    <span className="ml-1 text-gray-500 text-sm">hours</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end">
                    <span className="ml-1 text-gray-500 text-sm"> Rs. </span>
                    <span className="font-bold text-blue-600"> Rs. {contestant.hours * 100}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardList;