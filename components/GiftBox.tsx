'use client';

import React, { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti';
import { usePerson } from '@/context/nameContext'
import { updatePersonGiftAmount } from '@/database/actions'

const GiftBox = () => {
  const isInitialized = useRef(false)
  const { person, specialGiftCount } = usePerson();

  const [giftAmount, setGiftAmount] = useState<number>(person?.giftAmount ?? 0);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const emojiRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Using Math.random() to determine will have issue in development mode due to React.StrictMode
    if (isInitialized.current) return
    isInitialized.current = true

    if (giftAmount === 0) {
      const amount = calculateGiftAmount(specialGiftCount);
      setGiftAmount(amount);
      updatePersonGiftAmount(person!.email, amount);
    }
  }, [])

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

  const calculateGiftAmount = (specialGiftCount: number) => {
    if (specialGiftCount >= 10) return 1
    return Math.random() > 0.5 ? 2 : 1
  }

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
          {giftAmount === 1 ? (
            <p className="gift-box__text">🎉 You get a gift from your flower-fairy 🎉 <br/>Come to Admin desk!!!</p>
          ) : (
            <p className="gift-box__text">🎉 You get <span className="font-bold">TWO</span> gifts from your flower-fairy 🎉<br/>Come to Admin desk!!!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftBox;