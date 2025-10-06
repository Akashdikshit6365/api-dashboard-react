import React, { useEffect, useState } from 'react';
import { getJoke } from '../services/apiService';
import { ClipLoader } from 'react-spinners';
import { useSwipeable } from 'react-swipeable';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import EmojiFly from './EmojiFly';
import hoverSoundFile from '../assets/hover.mp3';
import laughSound from '../assets/laugh.mp3';

const JokeComponent = ({ refreshAll, autoRefreshInterval = 20000, playPing }) => {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [playHover] = useSound(hoverSoundFile);
  const [playLaugh] = useSound(laughSound);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const data = await getJoke();
      setJoke({ ...data, setup: data.setup + " 😂", punchline: data.punchline + " 😂" });
      setAnimationKey(prev => prev + 1);
      playPing?.();
      setShowConfetti(true);
      setShowEmoji(true);
      playLaugh();
      setTimeout(() => setShowConfetti(false), 1500);
      setTimeout(() => setShowEmoji(false), 1000);
    } catch { setJoke({ setup: 'Error fetching joke 😅', punchline: '' }); }
    finally { setLoading(false); }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => fetchJoke(),
    onSwipedRight: () => fetchJoke(),
    trackMouse: true
  });

//   useEffect(() => {
//     fetchJoke();
//     const interval = setInterval(fetchJoke, autoRefreshInterval);
//     return () => clearInterval(interval);
//   }, [refreshAll]);

  return (
    <div {...swipeHandlers} className="card joke-card" onMouseEnter={playHover}>
      {showConfetti && <Confetti numberOfPieces={100} recycle={false} colors={['#FF0000', '#0000FF']} />}
      {showEmoji && <EmojiFly emoji="😂" trigger={showEmoji} />}
      <h2>😂 Joke</h2>
      {loading ? <ClipLoader color="#ff5722" /> : (
        <>
          <p key={`setup-${animationKey}`}>{joke.setup}</p>
          <p key={`punch-${animationKey}`}><strong>{joke.punchline}</strong></p>
        </>
      )}
      <button onClick={fetchJoke}>Get New Joke</button>
    </div>
  );
};

export default JokeComponent;
