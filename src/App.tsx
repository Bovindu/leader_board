import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import ImageSlideshow from './components/ImageSlideshow';
import { leaderboardData } from './data/leaderboard-data';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main className="flex-grow py-8 md:py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                  <Leaderboard data={leaderboardData} />
                </div>
              </main>
              <ImageSlideshow />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;