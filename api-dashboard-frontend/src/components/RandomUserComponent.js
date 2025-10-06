import React, { useEffect, useState } from 'react';
import { getRandomUser } from '../services/apiService';
import { ClipLoader } from 'react-spinners';
import { useSwipeable } from 'react-swipeable';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import EmojiFly from './EmojiFly';
import hoverSoundFile from '../assets/hover.mp3';

const RandomUserCarousel = ({ refreshAll, count = 5, playPing }) => {
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [playHover] = useSound(hoverSoundFile);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getRandomUser(count);
      setUsers(data.results);
      setCurrent(0);
      playPing?.();
      setShowConfetti(true);
      setShowEmoji(true);
      setTimeout(() => setShowConfetti(false), 1500);
      setTimeout(() => setShowEmoji(false), 1000);
    } catch { setUsers([]); } 
    finally { setLoading(false); }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrent(prev => (prev + 1) % users.length);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
      setShowEmoji(true);
      setTimeout(() => setShowEmoji(false), 1000);
    },
    onSwipedRight: () => {
      setCurrent(prev => (prev - 1 + users.length) % users.length);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
      setShowEmoji(true);
      setTimeout(() => setShowEmoji(false), 1000);
    },
    trackMouse: true
  });

  useEffect(() => { fetchUsers(); }, [refreshAll]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % users.length);
      playPing?.();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
      setShowEmoji(true);
      setTimeout(() => setShowEmoji(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [users]);

  if (loading) return <div className="card user-card"><ClipLoader color="#4caf50" /></div>;
  if (!users.length) return <div className="card user-card"><p>Error fetching users 😢</p></div>;

  const user = users[current];

  return (
    <div {...swipeHandlers} className="card user-card" onMouseEnter={playHover}>
      {showConfetti && <Confetti numberOfPieces={80} recycle={false} colors={['#00FF00', '#800080']} />}
      {showEmoji && <EmojiFly emoji="👤" trigger={showEmoji} />}
      <h2>👤 Random User</h2>
      <p key={`name-${current}`}>{user.name.first} {user.name.last} 👤</p>
      <p key={`email-${current}`}>{user.email}</p>
      <img key={`img-${current}`} src={user.picture.medium} alt="user" />
    </div>
  );
};

export default RandomUserCarousel;
