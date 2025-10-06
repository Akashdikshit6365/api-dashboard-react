import React, { useEffect, useState } from 'react';
import { getCatFact } from '../services/apiService';
import { ClipLoader } from 'react-spinners';
import { useSwipeable } from 'react-swipeable';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import EmojiFly from './EmojiFly';
import hoverSoundFile from '../assets/hover.mp3';
import meowSound from '../assets/meow.mp3';

const CatFactComponent = ({ refreshAll, autoRefreshInterval = 15000, playPing }) => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [playHover] = useSound(hoverSoundFile);
  const [playMeow] = useSound(meowSound);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const data = await getCatFact();
      setFact(data.fact + " 🐱");
      setAnimationKey(prev => prev + 1);
      playPing?.();
      setShowConfetti(true);
      setShowEmoji(true);
      playMeow();
      setTimeout(() => setShowConfetti(false), 1500);
      setTimeout(() => setShowEmoji(false), 1000);
    } catch { setFact('Error fetching cat fact 😿'); } 
    finally { setLoading(false); }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => fetchFact(),
    onSwipedRight: () => fetchFact(),
    trackMouse: true
  });

//   useEffect(() => {
//     fetchFact();
//     const interval = setInterval(fetchFact, autoRefreshInterval);
//     return () => clearInterval(interval);
//   }, [refreshAll]);

  return (
    <div {...swipeHandlers} className="card cat-card" onMouseEnter={playHover}>
      {showConfetti && <Confetti numberOfPieces={100} recycle={false} colors={['#FFD700', '#FFA500']} />}
      {showEmoji && <EmojiFly emoji="🐱" trigger={showEmoji} />}
      <h2>🐱 Cat Fact</h2>
      {loading ? <ClipLoader color="#ff9800" /> : <p key={animationKey}>{fact}</p>}
      <button onClick={fetchFact}>Get New Fact</button>
    </div>
  );
};

export default CatFactComponent;
