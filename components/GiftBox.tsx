'use client';

import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

const GiftBox = () => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const emojiRef = useRef(null);

  const handleClaim = () => {
    // Remove joggle animation
    if (emojiRef.current) {
      emojiRef.current.classList.remove('joggle');

      // Force a reflow/repaint
      void emojiRef.current.offsetWidth;

      // Add claimed class
      emojiRef.current.classList.add('gift-box__emoji--claimed');
    }

    // Show message and hide emoji after animation
    setTimeout(() => {
      setIsMessageVisible(true);

      // Fire confetti
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.9 },
      });
    }, 500);
  };

  return (
    <div className="text-center">
      <div className="gift-box h-[160px] flex items-center justify-center">
        {!isMessageVisible && (
          <div
            ref={emojiRef} className="gift-box__emoji joggle select-none" role="button"
            onClick={handleClaim}
          >
            🎁
          </div>
        )}
        <div className={`gift-box__message ${!isMessageVisible ? 'gift-box__message--hidden' : ''}`}>
          {Math.random() > 0.5 ? (
            <p className="gift-box__text" onClick={() => setIsMessageVisible(false)}>🎉 You get a gift from your flower-fairy 🎉 <br/>Come to Admin desk!!!</p>
          ) : (
            <p className="gift-box__text" onClick={() => setIsMessageVisible(false)}>🎉 You get <span className="font-bold">TWO</span> gifts from your flower-fairy 🎉<br/>Come to Admin desk!!!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftBox;