import React from 'react';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import { leaderboardData } from './data/leaderboard-data';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Leaderboard data={leaderboardData} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;