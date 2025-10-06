import React, { useEffect, useState } from 'react';

const EmojiFly = ({ emoji, trigger }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return show ? (
    <div className="emoji-fly" style={{
      position: 'absolute',
      fontSize: '24px',
      animation: 'flyUp 1s ease-out'
    }}>
      {emoji}
    </div>
  ) : null;
};

export default EmojiFly;
