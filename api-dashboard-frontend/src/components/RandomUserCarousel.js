import React, { useEffect, useState } from 'react';
import { getRandomUser } from '../services/apiService';
import { ClipLoader } from 'react-spinners';
import { useSwipeable } from 'react-swipeable';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import EmojiFly from './EmojiFly';
import hoverSoundFile from '../assets/hover.mp3';
import dingSound from '../assets/ding.mp3';

const RandomUserCarousel = ({ refreshAll }) => {
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [playHover] = useSound(hoverSoundFile);
  const [playDing] = useSound(dingSound);

  // Fetch initial users
  const fetchUsers = async (num = 5) => {
    setLoading(true);
    try {
      const data = await getRandomUser(num);
      setUsers(data.results);
      setCurrent(0);
      setShowConfetti(true);
      setShowEmoji(true);
      playDing();
      setTimeout(() => setShowConfetti(false), 1500);
      setTimeout(() => setShowEmoji(false), 1000);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a completely new user from API
  const fetchNewUser = async () => {
    setLoading(true);
    try {
      const data = await getRandomUser(1);
      setUsers([data.results[0]]);
      setCurrent(0);
      setShowConfetti(true);
      setShowEmoji(true);
      playDing();
      setTimeout(() => setShowConfetti(false), 1500);
      setTimeout(() => setShowEmoji(false), 1000);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrent(prev => (prev + 1) % users.length),
    onSwipedRight: () => setCurrent(prev => (prev - 1 + users.length) % users.length),
    trackMouse: true
  });

  useEffect(() => { fetchUsers(); }, [refreshAll]);

  if (loading) return <div className="card user-card"><ClipLoader color="#4caf50" /></div>;
  if (!users.length) return <div className="card user-card"><p>Error fetching users 😢</p></div>;

  const user = users[current];

  return (
    <div>
      <div {...swipeHandlers} className="card user-card" onMouseEnter={playHover}>
        {showConfetti && <Confetti numberOfPieces={80} recycle={false} colors={['#00FF00', '#800080']} />}
        {showEmoji && <EmojiFly emoji="👤" trigger={showEmoji} />}
        <h2>👤 Random User</h2>
        <p key={`name-${current}`}>{user.name.first} {user.name.last} 👤</p>
        <p key={`email-${current}`}>{user.email}</p>
        <img key={`img-${current}`} src={user.picture.medium} alt="user" />
      </div>
      <button onClick={fetchNewUser} className="refresh-all" style={{ marginTop: '10px' }}>
        🔄 Get New User
      </button>
    </div>
  );
};

export default RandomUserCarousel;
