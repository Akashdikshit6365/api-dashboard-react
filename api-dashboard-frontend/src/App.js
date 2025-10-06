import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CatFactComponent from './components/CatFactComponent';
import JokeComponent from './components/JokeComponent';
import RandomUserCarousel from './components/RandomUserCarousel';
import './App.css';

function App() {
  const [refreshAll, setRefreshAll] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleRefreshAll = () => {
    setRefreshAll(prev => !prev);
    toast.info("🔄 All cards refreshed!");
    // removed playPing();
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <h1>🎯 API Dashboard</h1>
      <button className="refresh-all" onClick={handleRefreshAll}>🔄 Refresh All</button>
      <button className="refresh-all" onClick={toggleDarkMode}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
      <div className="dashboard">
        <CatFactComponent refreshAll={refreshAll} />
        <JokeComponent refreshAll={refreshAll} />
        <RandomUserCarousel refreshAll={refreshAll} count={5} />
      </div>
    </div>
  );
}

export default App;
